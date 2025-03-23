import CauseModel from "@/database/Cause";
import ValidationModel from "@/database/Validation";
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

      if (action == "verify-action") {

        const json = JSON.parse(signal!)
        const verification = await ValidationModel.findOne({ uuid: json.validation })
        if (!verification) return NextResponse.json({ verifyRes, status: 400 });
        const dbCause = await CauseModel.findOne({ uuid: verification.cause })

        if (!dbCause) return NextResponse.json({ verifyRes, status: 400 });
        verification.realValidation = true
        dbCause.validations = Number(dbCause.validations) + 1

        console.log(json, verification, dbCause)
        await dbCause.save()
        await verification.save()
      }

      if (action == "verify-orb-action") {
        const signalParsed = JSON.parse(signal!)
        const dbCause = await CauseModel.findOne({ uuid: signalParsed.uuid })
        if (!dbCause) return NextResponse.json({ verifyRes, status: 400 });
        dbCause.verificationLevel = "1"
        await dbCause.save()
      }

      return NextResponse.json({ verifyRes, status: 200 });


    } catch (error) {
      if (error) return NextResponse.json({ verifyRes, status: 400 });
    }


    return NextResponse.json({ verifyRes, status: 400 });
  } else {

    return NextResponse.json({ verifyRes, status: 400 });
  }
}
