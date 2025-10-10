import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

function escapeHtml(str?: string) {
  if (!str) return '';
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const name = (data.name || '').trim();
    const email = (data.email || '').trim();
    const subjectRaw = (data.subject || '').trim();
    const messageRaw = (data.message || '').trim();
    const page = (data.page || '').trim();

    // basic validation
    if (!name || !email || !messageRaw) {
      return NextResponse.json(
        { message: 'Missing required fields: name, email, and message are required.' },
        { status: 400 }
      );
    }

    // metadata
    const timestamp = new Date().toISOString();
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const subject = subjectRaw || `New message from website — ${name}`;

    // escape user content for HTML email
    const nameEsc = escapeHtml(name);
    const emailEsc = escapeHtml(email);
    const subjectEsc = escapeHtml(subjectRaw);
    const messageEsc = escapeHtml(messageRaw).replaceAll('\n', '<br/>');
    const pageEsc = escapeHtml(page);

    // create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const plainText = [
      'New contact form submission',
      '---------------------------',
      `Name: ${name}`,
      `Email: ${email}`,
      subjectRaw ? `Subject: ${subjectRaw}` : '',
      page ? `Page: ${page}` : '',
      `Received: ${timestamp}`,
      `IP: ${ip}`,
      `User-Agent: ${userAgent}`,
      '',
      'Message:',
      messageRaw,
    ]
      .filter(Boolean)
      .join('\n');

    const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>New contact — Zebotix</title>
  </head>
  <body style="font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111827; background:#fff; margin:0; padding:20px;">
    <div style="max-width:700px; margin:0 auto;">
      <h2 style="margin:0 0 8px 0; color:#0f172a;">New contact form submission</h2>
      <p style="margin:0 0 18px 0; color:#374151;">Received on: <strong>${timestamp}</strong></p>

      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse; width:100%; margin-bottom:18px;">
        <tbody>
          <tr>
            <td style="width:140px; font-weight:600; color:#374151; vertical-align:top;">Name</td>
            <td style="color:#111827;">${nameEsc}</td>
          </tr>
          <tr>
            <td style="font-weight:600; color:#374151; vertical-align:top;">Email</td>
            <td><a href="mailto:${emailEsc}" style="color:#2563eb; text-decoration:none;">${emailEsc}</a></td>
          </tr>
          ${
            subjectEsc
              ? `<tr>
            <td style="font-weight:600; color:#374151; vertical-align:top;">Subject</td>
            <td style="color:#111827;">${subjectEsc}</td>
          </tr>`
              : ''
          }
          ${
            pageEsc
              ? `<tr>
            <td style="font-weight:600; color:#374151; vertical-align:top;">Page</td>
            <td style="color:#111827;"><a href="${pageEsc}" style="color:#2563eb; text-decoration:none;">${pageEsc}</a></td>
          </tr>`
              : ''
          }
          <tr>
            <td style="font-weight:600; color:#374151; vertical-align:top;">IP</td>
            <td style="color:#111827;">${escapeHtml(ip)}</td>
          </tr>
          <tr>
            <td style="font-weight:600; color:#374151; vertical-align:top;">User-Agent</td>
            <td style="color:#111827;">${escapeHtml(userAgent)}</td>
          </tr>
        </tbody>
      </table>

      <div style="border-top:1px solid #e6e7ea; padding-top:12px;">
        <h3 style="margin:0 0 8px 0; font-size:16px; color:#0f172a;">Message</h3>
        <div style="font-size:14px; line-height:1.5; color:#111827;">${messageEsc}</div>
      </div>

      <footer style="margin-top:18px; color:#6b7280; font-size:12px;">
        <p style="margin:0;">This message was sent from the Zebotix website contact form.</p>
      </footer>
    </div>
  </body>
</html>`;

    const mailOptions = {
      from: `"Zebotix Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email, // so you can hit Reply in your mail client
      subject: `Zebotix contact — ${subject}`,
      text: plainText,
      html,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error in contact POST:', err);
    return NextResponse.json(
      { message: 'Error sending email', error: String(err) },
      { status: 500 }
    );
  }
}
