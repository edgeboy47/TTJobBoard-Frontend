import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const link = new URL(req.url!, `http://${req.headers.host!}`)

  // Copy the search params part of the request onto the API call
  let url = `${process.env.NEXT_PUBLIC_API_URL!}${link.search}`

  if (req.method === "GET") {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    const json = await response.json();

    res.status(200).json(json);
  }
}
