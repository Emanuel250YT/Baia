import { APIResponse, APICodes, APIMessages, APIStatus } from "@/classes/APIResponses";
import { authOptions } from "@/lib/authOptions";
import connectDatabase from "@/lib/connectDatabase";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const session = await getServerSession(authOptions)

  if (!session && process.env.ENV != "development") return new APIResponse({
    body: {},
    code: APICodes[401],
    message: APIMessages.UnAuthorized,
    status: APIStatus.Unauthorized
  }).response()

  await connectDatabase()

  const nonce = crypto.randomUUID().replace(/-/g, "");

  cookies().set("siwe", nonce, { secure: true });
  return NextResponse.json({ nonce });
}

