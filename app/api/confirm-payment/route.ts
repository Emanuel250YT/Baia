import { APIResponse, APICodes, APIMessages, APIStatus } from "@/classes/APIResponses";
import CauseModel from "@/database/Cause";
import DonationModel from "@/database/Donation";
import { authOptions } from "@/lib/authOptions";
import connectDatabase from "@/lib/connectDatabase";
import { MiniAppPaymentSuccessPayload } from "@worldcoin/minikit-js";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface IRequestPayload {
  payload: MiniAppPaymentSuccessPayload;
}

export async function POST(req: NextRequest) {

  const session = await getServerSession(authOptions)

  if (!session && process.env.ENV != "development") return new APIResponse({
    body: {},
    code: APICodes[401],
    message: APIMessages.UnAuthorized,
    status: APIStatus.Unauthorized
  }).response()

  await connectDatabase()

  const { payload } = (await req.json()) as IRequestPayload;



  const reference = await DonationModel.findOne({ uuid: payload.reference })

  if (!reference) {
    return NextResponse.json({ success: false });
  }


  // 1. Check that the transaction we received from the mini app is the same one we sent
  if (payload.reference == reference.uuid) {
    const response = await fetch(
      `https://developer.worldcoin.org/api/v2/minikit/transaction/${payload.transaction_id}?app_id=${process.env.APP_ID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.DEV_PORTAL_API_KEY}`,
        },
      }
    );
    const transaction = await response.json();
    // 2. Here we optimistically confirm the transaction.
    // Otherwise, you can poll until the status == mined
    if (transaction.reference == reference.uuid && transaction.status != "failed") {

      reference.verified = true;
      const cause = await CauseModel.findOne({ uuid: reference.cause })
      if (cause) {
        cause.funds = Number(cause.funds) + reference.amount;
        await cause.save()
      }
      await reference.save()
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  }
}
