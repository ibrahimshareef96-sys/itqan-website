import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  // Log submission — email forwarding will be connected later
  console.log('[Contact Form Submission]', data);

  return NextResponse.json({ ok: true });
}
