import { NextResponse } from 'next/server';

export async function GET() {
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL || '';
  const scriptUrl = `${umamiUrl}/script.js`;
  
  try {
    const res = await fetch(scriptUrl);
    if (!res.ok) throw new Error('Failed to fetch umami.js');
    
    const scriptContent = await res.text();
    return new NextResponse(scriptContent, {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
  }
}
