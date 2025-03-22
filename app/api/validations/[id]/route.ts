import { APIResponse, APICodes, APIMessages, APIStatus } from "@/classes/APIResponses";
import CauseModel from "@/database/Cause";
import ValidationModel from "@/database/Validation";
import { authOptions } from "@/lib/authOptions";
import connectDatabase from "@/lib/connectDatabase";
import { sanitizeModel } from "@/lib/sanitize";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session && process.env.ENV != "development") return new APIResponse({
    body: {},
    code: APICodes[401],
    message: APIMessages.UnAuthorized,
    status: APIStatus.Unauthorized
  }).response()

  await connectDatabase()

  const id = req.nextUrl.pathname.split('/').pop();

  if (!id || id.length < 1) return new APIResponse({
    body: {},
    code: APICodes[404],
    message: APIMessages.NotFound,
    status: APIStatus.NotFound
  }).response()

  const dbValidation = await ValidationModel.find({
    wallet: id
  })

  if (!dbValidation) return new APIResponse({
    body: {},
    code: APICodes[404],
    message: APIMessages.NotFound,
    status: APIStatus.NotFound
  }).response()

  return new APIResponse({
    body: dbValidation.map(cause => {
      return sanitizeModel(cause)
    }),
    code: APICodes[200],
    message: APIMessages.OK,
    status: APIStatus.OK
  }).response()
}