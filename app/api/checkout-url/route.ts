import { NextResponse } from 'next/server';

export async function GET() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN;
  if (!domain) {
    return NextResponse.json({ error: 'SHOPIFY_STORE_DOMAIN not configured on server' }, { status: 500 });
  }

  return NextResponse.json({ domain });
}
