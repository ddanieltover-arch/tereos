import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getClientIp, rateLimit } from '@/lib/api/rate-limit';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(`newsletter:${ip}`, { limit: 5, windowMs: 15 * 60 * 1000 });

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
    const validated = newsletterSchema.parse(body);

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Tereos Corporate <sales@tereosa.com>',
        to: 'sales@tereosa.com',
        subject: `New Newsletter Subscription: ${validated.email}`,
        html: `<p>A new user has subscribed to the newsletter:</p><p><strong>Email:</strong> ${validated.email}</p>`,
      });
    } else {
      console.log('[Newsletter] Subscription received:', validated.email);
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to the newsletter.',
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
