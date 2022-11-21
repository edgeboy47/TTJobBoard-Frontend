import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
    
    const json = await response.json();

    res.status(200).json(json)
  }
}