import connectDB from '@/lib/db/connect';
import Visit from '@/lib/models/visits';

export async function POST(request: Request) {
  try {
    await connectDB();
    await Visit.create({
      ip: request.headers.get('x-forwarded-for') || 'Unknown',
      referrer: request.headers.get('referer') || 'Direct',
      path: request.url.replace(/^https?:\/\/[^\/]+/, '') || '/',
      method: 'POST',
      status: 200,
      userAgent: request.headers.get('user-agent') || 'Unknown',
    });
    return new Response('Visit logged', { status: 200 });
  } catch (error) {
    console.error('Error logging visit:', error);
    return new Response('Error logging visit', { status: 500 });
  }
}
