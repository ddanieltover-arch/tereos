
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getClientIp, rateLimit } from '@/lib/api/rate-limit';

const DEPARTMENT_EMAILS: Record<string, string> = {
  sales: 'sales@tereosa.com',
  export: 'export@tereosa.com',
  investor: 'ir@tereosa.com',
  sustainability: 'sustainability@tereosa.com',
  media: 'media@tereosa.com',
  careers: 'careers@tereosa.com',
  general: 'info@tereosa.com',
};

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  department: z.string().min(1, 'Department is required'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
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

    if (process.env.RESEND_API_KEY) {
      // await resend.emails.send({ to: routedTo, cc: 'info@tereosa.com', ... })
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
