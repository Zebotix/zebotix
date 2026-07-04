import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import { COMPANY_NAME } from '@/lib/constants';
import { upsertVisit } from '@/lib/data/visitsUtil';
import { escapeHtml, getRequestMetadata } from '@/lib/server/utils';

export async function POST(request: Request) {
  try {
    const { ip, userAgent, referer, headers } = getRequestMetadata(request);
    const url = new URL(request.url);
    const pathName = url.pathname;
    const queryParams = Object.fromEntries(url.searchParams);

    const mergedMetadata = {
      ...headers,
      ...queryParams,
    };

    const visitDoc = upsertVisit({
      ip,
      userAgent,
      path: pathName,
      referrer: referer,
      metadata: mergedMetadata
    });

    // Email notification logic
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"${COMPANY_NAME} Analytics" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `[Zebotix] Visit: ${pathName}`,
        html: `
          <div style="font-family: sans-serif; color: #111827; padding: 24px; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 12px; background: #ffffff;">
            <h2 style="color: #2563eb; margin-top: 0; font-size: 20px;">New Visit Activity</h2>
            <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 8px 0;"><strong>Path:</strong> <span style="color: #2563eb;">${escapeHtml(pathName)}</span></p>
              <p style="margin: 0 0 8px 0;"><strong>IP:</strong> ${escapeHtml(ip)}</p>
              <p style="margin: 0 0 8px 0;"><strong>Referrer:</strong> ${escapeHtml(referer || 'Direct')}</p>
            </div>
            <p style="font-size: 12px; color: #6b7280; margin: 0;"><strong>User Agent:</strong> ${escapeHtml(userAgent)}</p>
            <p style="font-size: 11px; color: #9ca3af; margin-top: 12px; padding-top: 12px; border-top: 1px solid #f3f4f6;">
              Ref: ${visitDoc.id} • ${new Date().toISOString()}
            </p>
          </div>
        `,
      };

      // Background the email send
      transporter.sendMail(mailOptions).catch(err => console.error('Email notification failed:', err));
    }

    return NextResponse.json({ success: true, id: visitDoc.id });
  } catch (err) {
    console.error('Visits API Error:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
