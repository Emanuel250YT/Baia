import CauseModel from "@/database/Cause";
import {
  verifyCloudProof,
  IVerifyResponse,
  ISuccessResult,
} from "@worldcoin/minikit-js";
import { NextRequest, NextResponse } from "next/server";

interface IRequestPayload {
  payload: ISuccessResult;
  action: string;
  signal: string | undefined;
}

export async function POST(req: NextRequest) {
  const { payload, action, signal } = (await req.json()) as IRequestPayload;
  const app_id = process.env.APP_ID as `app_${string}`;
  const verifyRes = (await verifyCloudProof(
    payload,
    app_id,
    action,
    signal
  )) as IVerifyResponse; // Wrapper on this



  if (verifyRes.success) {
    try {
      const signalParsed = JSON.parse(signal!)
      const dbCause = await CauseModel.findOne({ uuid: signalParsed.uuid })
      if (!dbCause) return NextResponse.json({ verifyRes, status: 400 });
      dbCause.verificationLevel = "1"
      await dbCause.save()
      return NextResponse.json({ verifyRes, status: 200 });
    } catch (error) {
      if (error) return NextResponse.json({ verifyRes, status: 400 });
    }


    return NextResponse.json({ verifyRes, status: 400 });
  } else {

    return NextResponse.json({ verifyRes, status: 400 });
  }
}
