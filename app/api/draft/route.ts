import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
const { CONTENTFUL_PREVIEW_SECRET } = process.env;
import { COOKIE_NAME_PRERENDER_BYPASS } from "next/dist/server/api-utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get("previewSecret") !== CONTENTFUL_PREVIEW_SECRET) {
    return new NextResponse("Invalid Token", { status: 401 });
  }

  draftMode().enable();

  redirect(searchParams.get("redirect") || "/");
}
