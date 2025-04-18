import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret = process.env.CONTENTFUL_REVALIDATE_SECRET;

  if (req.headers["x-contentful-webhook-secret"] !== secret) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    await res.revalidate("/");
    return res.json({ message: "Revalidation triggered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error revalidating", error });
  }
}
