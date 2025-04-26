import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const requestHeaders = new Headers(request.headers);
  const secret = process.env.CONTENTFUL_REVALIDATE_SECRET;

  if (requestHeaders.get("x-contentful-webhook-secret") !== secret) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    revalidatePath("/", "layout");
    return NextResponse.json({
      message: "Revalidation triggered successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error revalidating",
        error,
      },
      { status: 500 }
    );
  }
}
