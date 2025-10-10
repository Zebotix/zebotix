import connectDB from '@/lib/db/connect';
import Visit from '@/lib/models/visits';
import nodemailer from 'nodemailer';

function escapeHtml(str?: unknown) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function POST(request: Request) {
  const startTs = Date.now();
  console.log('visits POST handler started', { time: new Date().toISOString() });

  try {
    // 0) show request url (useful)
    console.log('Incoming request.url:', request.url);

    // 1) connect DB (use a cached connection inside connectDB)
    console.log('Connecting to DB...');
    const dbStart = Date.now();
    await connectDB();
    console.log('DB connected (ms):', Date.now() - dbStart);

    // 2) Normalize headers and URL
    const headersObj = Object.fromEntries(request.headers.entries()); // header names are lowercased
    console.debug('Parsed headers (sample):', {
      host: headersObj['host'],
      'user-agent': headersObj['user-agent']?.slice(0, 200),
      'x-forwarded-for': headersObj['x-forwarded-for'],
      referer: headersObj['referer'] || headersObj['referrer'],
    });

    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams);
    console.log('Parsed url path and query', {
      pathname: url.pathname,
      queryCount: Object.keys(queryParams).length,
    });

    const ip = (headersObj['x-forwarded-for'] || headersObj['x-real-ip'] || 'Unknown')
      .toString()
      .split(',')[0]
      .trim();
    const userAgent = headersObj['user-agent'] || 'Unknown';
    const referrer = headersObj['referer'] || headersObj['referrer'] || 'Direct';
    const path = url.pathname;

    console.log('Visitor summary', { ip, userAgent: userAgent.slice(0, 200), referrer, path });

    // 3) find last visit by IP + userAgent (index this combo in your schema)
    console.log('Looking for existing visit with ip+userAgent...');
    const findStart = Date.now();
    const existingVisit = await Visit.findOne({ ip, userAgent }).sort({ createdAt: -1 });
    console.log(
      'Query completed (ms):',
      Date.now() - findStart,
      'existingVisitId:',
      existingVisit ? String(existingVisit._id) : null
    );

    // 4) Merge metadata (existing -> new)
    const mergedMetadata = {
      ...(existingVisit?.metadata || {}),
      ...headersObj,
      ...queryParams,
    };

    // Log metadata keys (do not log full headers to avoid noisy secrets)
    console.debug('Merged metadata keys:', Object.keys(mergedMetadata).slice(0, 40));

    let visitDoc;
    if (existingVisit) {
      console.log('Updating existing visit:', existingVisit._id);
      const updateStart = Date.now();
      await Visit.updateOne(
        { _id: existingVisit._id },
        {
          $set: {
            referrer,
            path,
            method: 'POST',
            status: 200,
            userAgent,
            metadata: mergedMetadata,
            updatedAt: new Date(),
          },
        }
      );
      console.log('Update complete (ms):', Date.now() - updateStart);

      // re-fetch the document (to get updated fields)
      visitDoc = await Visit.findById(existingVisit._id);
      console.log('Re-fetched visitDoc id:', String(visitDoc._id));
    } else {
      console.log('Creating new visit document...');
      const createStart = Date.now();
      visitDoc = await Visit.create({
        ip,
        referrer,
        path,
        method: 'POST',
        status: 200,
        userAgent,
        metadata: mergedMetadata,
      });
      console.log(
        'Create complete (ms):',
        Date.now() - createStart,
        'newVisitId:',
        String(visitDoc._id)
      );
    }

    // 5) prepare email content
    const timestamp = new Date().toISOString();
    console.log('Preparing email content', { timestamp, visitId: String(visitDoc._id) });

    const plainText = [
      'New website visit logged',
      '------------------------',
      `IP: ${ip}`,
      `Path: ${path}`,
      `Referrer: ${referrer}`,
      `User-Agent: ${userAgent}`,
      `Received: ${timestamp}`,
      '',
      'Query params:',
      JSON.stringify(queryParams, null, 2),
      '',
      'Headers:',
      JSON.stringify(
        {
          host: headersObj['host'],
          'user-agent': headersObj['user-agent'],
          'x-forwarded-for': headersObj['x-forwarded-for'],
          referer: headersObj['referer'] || headersObj['referrer'],
        },
        null,
        2
      ),
      '',
      `Visit ID: ${visitDoc._id}`,
    ].join('\n');

    const headerEntries = Object.entries(headersObj).slice(0, 200);
    const headerRows = headerEntries
      .map(
        ([k, v]) =>
          `<tr><td style="font-weight:600;padding:6px;color:#374151;vertical-align:top;">${escapeHtml(
            k
          )}</td><td style="padding:6px;color:#111827">${escapeHtml(v)}</td></tr>`
      )
      .join('');

    const queryEntries = Object.entries(queryParams);
    const queryRows = queryEntries
      .map(
        ([k, v]) =>
          `<tr><td style="font-weight:600;padding:6px;color:#374151;vertical-align:top;">${escapeHtml(
            k
          )}</td><td style="padding:6px;color:#111827">${escapeHtml(v)}</td></tr>`
      )
      .join('');

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
      : '';

    const html = `<!doctype html>
<html>
  <head><meta charset="utf-8" /></head>
  <body style="font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,Arial; color:#111827; margin:0; padding:20px;">
    <div style="max-width:700px;margin:0 auto;">
      <h2 style="margin:0 0 8px 0;color:#0f172a;">New website visit logged</h2>
      <p style="margin:0 0 16px;color:#374151;">Received on: <strong>${escapeHtml(
        timestamp
      )}</strong></p>

      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;margin-bottom:12px;">
        <tbody>
          <tr><td style="width:140px;font-weight:600;color:#374151;vertical-align:top;">IP</td><td style="color:#111827;">${escapeHtml(
            ip
          )}</td></tr>
          <tr><td style="font-weight:600;color:#374151;vertical-align:top;">Path</td><td style="color:#111827;"><a href="${escapeHtml(
            `${siteUrl}${path}`
          )}" style="color:#2563eb;text-decoration:none;">${escapeHtml(path)}</a></td></tr>
          <tr><td style="font-weight:600;color:#374151;vertical-align:top;">Referrer</td><td style="color:#111827;">${escapeHtml(
            referrer
          )}</td></tr>
          <tr><td style="font-weight:600;color:#374151;vertical-align:top;">User-Agent</td><td style="color:#111827;">${escapeHtml(
            userAgent
          )}</td></tr>
        </tbody>
      </table>

      ${
        queryRows
          ? `<h4 style="margin:12px 0 6px 0;color:#0f172a;">Query parameters</h4>
      <table style="width:100%;border-collapse:collapse;margin-bottom:12px;">${queryRows}</table>`
          : ''
      }

      <h4 style="margin:12px 0 6px 0;color:#0f172a;">Headers</h4>
      <table style="width:100%;border-collapse:collapse;">${headerRows}</table>

      <footer style="margin-top:16px;color:#6b7280;font-size:12px;">
        <p style="margin:0;">Visit ID: ${escapeHtml(
          String(visitDoc._id)
        )} • Logged to DB: ${escapeHtml(String(visitDoc.createdAt || new Date().toISOString()))}</p>
      </footer>
    </div>
  </body>
</html>`;

    // prepare transporter (do NOT log secrets)
    console.log('Creating mail transporter (provider):', process.env.EMAIL_SERVICE || 'gmail');
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Zebotix Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Zebotix — Visit: ${ip} ${path}`,
      text: plainText,
      html,
    };

    // send mail but don't block forever
    console.log('Attempting to send email (non-blocking) ...');
    let emailSent = false;
    const mailStart = Date.now();
    try {
      await transporter.sendMail(mailOptions);
      emailSent = true;
      console.log('Email sent successfully (ms):', Date.now() - mailStart);
    } catch (mailErr) {
      console.error('Email send failed (non-blocking):', mailErr);
      emailSent = false;
    }

    // final log and response
    const totalMs = Date.now() - startTs;
    console.log('visits POST handler finished', {
      visitId: String(visitDoc._id),
      emailSent,
      totalMs,
    });

    return new Response(JSON.stringify({ success: true, visitId: visitDoc._id, emailSent }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Error in visits POST:', err);
    return new Response(JSON.stringify({ success: false, error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
