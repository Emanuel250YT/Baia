import { APICodes, APIMessages, APIResponse, APIStatus } from "@/classes/APIResponses";
import { ZCauseCreate } from "@/classes/Cause";
import CauseModel from "@/database/Cause";
import { uploadFileToAWS } from "@/lib/awsManager";
import connectDatabase from "@/lib/connectDatabase";
import { formToObject } from "@/lib/formTransforms";
import { sanitizeModel } from "@/lib/sanitize";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  await connectDatabase()

  const formBody = await req.formData().catch(err => {
    if (err) return false
  })

  const body = await formToObject(formBody)
  const parsedBody = ZCauseCreate.safeParse(body)

  if (!body || !parsedBody.success) return new APIResponse({
    code: APICodes[400],
    body: {},
    message: APIMessages.BadRequest,
    status: APIStatus.BadRequest
  }).response()


  parsedBody.data.images = body["images"]
  parsedBody.data.profile = body["profile"]


  if (!parsedBody.success) return new APIResponse({
    code: APICodes[400],
    body: {},
    message: APIMessages.BadRequest,
    status: APIStatus.BadRequest
  }).response()

  const finalBody = {
    ...parsedBody.data,
    createdAt: new Date().getTime(),
    uuid: crypto.randomUUID().toString(),
  }

  finalBody.images = await Promise.all(body["images"].map(async (value: File) => {
    return await uploadFileToAWS(value)
  }))

  //@ts-ignore
  finalBody.profile = await uploadFileToAWS(body["profile"] || "") || ""
  //@ts-ignore
  finalBody.fundsLimit = 0
  //@ts-ignore
  finalBody.verificationLevel = 0;

  //@ts-ignore
  finalBody.detail = {}


  const cause = await CauseModel.create(finalBody).catch(err => {
    if (err) return false
  })

  if (!cause) return new APIResponse({
    body: {},
    code: APICodes[500],
    message: APIMessages.InternalServerError,
    status: APIStatus.InternalServerError
  }).response()


  return NextResponse.json(sanitizeModel(cause))
}