import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import { COMPANY_NAME, CONTACT_EMAIL } from '@/lib/constants';
import { escapeHtml, getRequestMetadata, getTimestamp } from '@/lib/server/utils';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const name = (data.name || '').trim();
    const email = (data.email || '').trim();
    const messageRaw = (data.message || '').trim();
    const subjectRaw = (data.subject || '').trim();

    if (!name || !email || !messageRaw) {
      return NextResponse.json(
        { message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const { ip, userAgent } = getRequestMetadata(request);
    const timestamp = getTimestamp();
    const subject = subjectRaw || `New Inquiry from ${name}`;

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const html = `
      <div style="font-family: sans-serif; color: #111827; padding: 20px; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #2563eb; margin-top: 0;">New Contact Form Submission</h2>
        <div style="margin-bottom: 20px;">
          <p style="margin: 4px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${escapeHtml(email)}</a></p>
          ${subjectRaw ? `<p style="margin: 4px 0;"><strong>Subject:</strong> ${escapeHtml(subjectRaw)}</p>` : ''}
        </div>
        <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
          <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(messageRaw)}</p>
        </div>
        <footer style="font-size: 11px; color: #9ca3af; border-top: 1px solid #f3f4f6; pt: 15px;">
          <p style="margin: 4px 0;">IP: ${ip} • Sent at: ${timestamp}</p>
          <p style="margin: 4px 0;">${userAgent}</p>
        </footer>
      </div>
    `;

    await transporter.sendMail({
      from: `"${COMPANY_NAME} Website" <${process.env.EMAIL_USER}>`,
      to: CONTACT_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
      subject: `[${COMPANY_NAME} Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${messageRaw}`,
      html,
    });

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (err) {
    console.error('Contact API Error:', err);
    return NextResponse.json(
      { message: 'Failed to send message' },
      { status: 500 }
    );
  }
}
