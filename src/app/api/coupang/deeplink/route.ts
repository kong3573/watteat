import { NextRequest, NextResponse } from 'next/server';
import { createCoupangDeeplink } from '@/lib/coupangApi';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { urls, subId, accessKey, secretKey } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'urls array is required' },
        { status: 400 }
      );
    }

    const effectiveAccessKey = accessKey || process.env.COUPANG_ACCESS_KEY;
    const effectiveSecretKey = secretKey || process.env.COUPANG_SECRET_KEY;

    // API Key가 없는 경우 fallback 응답 제공 (원래 URL 반환)
    if (!effectiveAccessKey || !effectiveSecretKey) {
      return NextResponse.json({
        fallback: true,
        message: 'Coupang API keys not configured. Falling back to direct URL.',
        data: urls.map((u: string) => ({
          originalUrl: u,
          shortenUrl: u,
          landingUrl: u,
        })),
      });
    }

    const data = await createCoupangDeeplink(urls, subId, {
      accessKey: effectiveAccessKey,
      secretKey: effectiveSecretKey,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Coupang Deeplink API Error:', err.message);
    return NextResponse.json(
      { error: err.message || 'Failed to generate deeplink' },
      { status: 500 }
    );
  }
}
