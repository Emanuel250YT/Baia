import { APIResponse, APICodes, APIMessages, APIStatus } from "@/classes/APIResponses";
import CauseModel from "@/database/Cause";
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
  const body = await req.json().catch(err => {
    if (err) return false
  })

  if (!body) return new APIResponse({
    body: {},
    code: APICodes[400],
    message: APIMessages.BadRequest,
    status: APIStatus.BadRequest
  }).response()

  const dbCause = await CauseModel.findOne({ uuid: body.cause })

  if (!dbCause) return new APIResponse({
    body: {},
    code: APICodes[404],
    message: APIMessages.NotFound,
    status: APIStatus.NotFound
  }).response()

  if (dbCause.wallet == body.wallet) return new APIResponse({
    body: {},
    code: APICodes[400],
    message: APIMessages.BadRequest,
    status: APIStatus.BadRequest
  }).response()

  await DonationModel.create({
    createdAt: new Date().getTime(),
    uuid: uuid,
    wallet: body.wallet,
    cause: body.cause,
    amount: Number(body.amount)
  })


  return NextResponse.json({ id: uuid });
}
