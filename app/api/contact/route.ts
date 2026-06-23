
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getClientIp, rateLimit } from '@/lib/api/rate-limit';
import { Resend } from 'resend';
import { getTranslations } from 'next-intl/server';
import { InternalNotificationEmail } from '@/components/emails/internal-notification';
import { UserAcknowledgmentEmail } from '@/components/emails/user-acknowledgment';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

const DEPARTMENT_EMAILS: Record<string, string> = {
  sales: 'sales@tereosa.com',
  export: 'sales@tereosa.com',
  investor: 'sales@tereosa.com',
  sustainability: 'sales@tereosa.com',
  media: 'contact-presse@tereos.com',
  careers: 'sales@tereosa.com',
  general: 'sales@tereosa.com',
};

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  department: z.string().min(1, 'Department is required'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  locale: z.string().optional().default('en'),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 15 * 60 * 1000 });

    if (!limit.success) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': String(Math.ceil((limit.resetAt - Date.now()) / 1000)) },
        }
      );
    }

    const body = await request.json();
    const validated = contactSchema.parse(body);
    const routedTo = DEPARTMENT_EMAILS[validated.department] || DEPARTMENT_EMAILS.general;

    const t = await getTranslations({ locale: validated.locale, namespace: 'emails.userAcknowledgment' });

    if (process.env.RESEND_API_KEY) {
      await Promise.all([
        resend.emails.send({
          from: 'Tereos Corporate <sales@tereosa.com>',
          to: routedTo,
          replyTo: validated.email,
          subject: `New Inquiry: ${validated.subject}`,
          react: InternalNotificationEmail({
            firstName: validated.firstName,
            lastName: validated.lastName,
            email: validated.email,
            phone: validated.phone,
            department: validated.department,
            subject: validated.subject,
            message: validated.message,
          }),
        }),
        resend.emails.send({
          from: 'Tereos Corporate <sales@tereosa.com>',
          to: validated.email,
          subject: t('thankYou'),
          react: UserAcknowledgmentEmail({
            firstName: validated.firstName,
            lastName: validated.lastName,
            subject: validated.subject,
            message: validated.message,
            translations: {
              previewText: t('previewText'),
              thankYou: t('thankYou'),
              dear: t('dear', { firstName: validated.firstName, lastName: validated.lastName }),
              received: t('received', { subject: validated.subject }),
              yourMessage: t('yourMessage'),
              globalOperations: t('globalOperations'),
            }
          }),
        }),
      ]);
    } else {
      console.log('[Contact] Message routed to:', routedTo, {
        from: validated.email,
        subject: validated.subject,
        department: validated.department,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      routedTo,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors[0]?.message, errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
