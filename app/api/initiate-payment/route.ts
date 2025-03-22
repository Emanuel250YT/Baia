import DonationModel from "@/database/Donation";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const uuid = crypto.randomUUID().replace(/-/g, "");
  const body = await req.json()

  await DonationModel.create({
    createdAt: new Date().getTime(),
    uuid: uuid,
    wallet: body.wallet,
    cause: body.cause,
    amount: body.amount
  })


  return NextResponse.json({ id: uuid });
}
