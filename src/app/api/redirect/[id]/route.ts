import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Here you could validate the ID or perform additional logic
  // before redirecting the user

  // Redirect to the /:id page
  return NextResponse.redirect(new URL(`/${id}`, request.url));
}
