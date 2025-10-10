import connectDB from '@/lib/db/connect';
import Visit from '@/lib/models/visits';

export async function POST(request: Request) {
  // Use a timeout to ensure quick fail if DB takes too long
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout connecting to DB')), 6000)
  );

  try {
    await Promise.race([connectDB(), timeoutPromise]);

    const headers = request.headers;
    const url = new URL(request.url);

    await Visit.create({
      ip: headers.get('x-forwarded-for') || 'Unknown',
      referrer: headers.get('referer') || 'Direct',
      path: url.pathname,
      method: 'POST',
      status: 200,
      userAgent: headers.get('user-agent') || 'Unknown',
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error('❌ Error logging visit:', error);
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
    });
  }
}
