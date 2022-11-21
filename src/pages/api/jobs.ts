import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { page } = query;

  if (req.method === "GET") {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL!}?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );

    const json = await response.json();

    res.status(200).json(json);
  }
}
