import { APICodes, APIMessages, APIResponse, APIStatus } from "@/classes/APIResponses";
import { ZValidationCreate } from "@/classes/Validation";
import CauseModel from "@/database/Cause";
import ValidationModel from "@/database/Validation";
import { uploadFileToAWS } from "@/lib/awsManager";
import connectDatabase from "@/lib/connectDatabase";
import { formToObject } from "@/lib/formTransforms";
import { sanitizeModel } from "@/lib/sanitize";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {



  const session = await getServerSession(authOptions)

  if (!session && process.env.ENV != "development") return new APIResponse({
    body: {},
    code: APICodes[401],
    message: APIMessages.UnAuthorized,
    status: APIStatus.Unauthorized
  }).response()

  await connectDatabase()


  const formBody = await req.formData().catch(err => {
    if (err) return false
  })

  const body = await formToObject(formBody)
  const parsedBody = ZValidationCreate.safeParse(body)

  if (!body || !parsedBody.success) return new APIResponse({
    code: APICodes[400],
    body: {},
    message: APIMessages.BadRequest,
    status: APIStatus.BadRequest
  }).response()

  parsedBody.data.images = body["images"]

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

  const dbCause = await CauseModel.findOne({ uuid: finalBody.cause }).catch(err => {
    if (err) return false
  })

  if (!dbCause) return new APIResponse({
    body: {},
    code: APICodes[404],
    message: APIMessages.NotFound,
    status: APIStatus.NotFound
  }).response()

  //@ts-ignore
  finalBody.images = await Promise.all([].concat(body["images"]).map(async (value: File) => {
    return await uploadFileToAWS(value)
  }))


  const validation = await ValidationModel.create(finalBody).catch(err => {
    if (err) return false
  })

  if (!validation) return new APIResponse({
    body: {},
    code: APICodes[500],
    message: APIMessages.InternalServerError,
    status: APIStatus.InternalServerError
  }).response()


  return NextResponse.json(sanitizeModel(validation))
}