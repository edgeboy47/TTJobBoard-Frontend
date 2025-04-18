import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const url = `${process.env.NEXT_PUBLIC_API_URL! + '/jobs?' + params}`

  console.log('fetching from url', url)
  const response = await fetch(url, {
    cache: 'no-store'
  });

  if (response.ok) {
    const json = await response.json();

    const data = {
      data: json.data,
      meta: json.meta,
    };

    return Response.json({ data }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache',
      }
    });
  }

  const data = {
    data: [],
    meta: {},
  };

  return Response.json({ data }, { status: 200 });
}
