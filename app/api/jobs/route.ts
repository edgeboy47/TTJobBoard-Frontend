import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let url = `${process.env.NEXT_PUBLIC_API_URL!}/jobs${request.nextUrl.search}`

  console.log('fetching from url', url)
  const response = await fetch(url, {
    next: {
      revalidate: 1800
    }
  });

  if (response.ok) {
    const json = await response.json();

    const data = {
      data: json.data,
      meta: json.meta,
    };

    return Response.json({ data }, { status: 200 });
  }

  const data = {
    data: [],
    meta: {},
  };

  return Response.json({ data }, { status: 200 });
}
