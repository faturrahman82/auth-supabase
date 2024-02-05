import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOption);

  return NextResponse.json({authenticated: !!session})
};
