import { APIResponse, APICodes, APIMessages, APIStatus } from "@/classes/APIResponses";
import DonationModel from "@/database/Donation";
import { authOptions } from "@/lib/authOptions";
import connectDatabase from "@/lib/connectDatabase";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const session = await getServerSession(authOptions)

  if (!session && process.env.ENV != "development") return new APIResponse({
    body: {},
    code: APICodes[401],
    message: APIMessages.UnAuthorized,
    status: APIStatus.Unauthorized
  }).response()

  await connectDatabase()

  const uuid = crypto.randomUUID().replace(/-/g, "");
  const body = await req.json()

  await DonationModel.create({
    createdAt: new Date().getTime(),
    uuid: uuid,
    wallet: body.wallet,
    cause: body.cause,
    amount: Number(body.amount)
  })


  return NextResponse.json({ id: uuid });
}
