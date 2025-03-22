import { APICodes, APIMessages, APIResponse, APIStatus } from "@/classes/APIResponses";
import { ZCauseCreate } from "@/classes/Cause";
import CauseModel from "@/database/Cause";
import { uploadFileToAWS } from "@/lib/awsManager";
import connectDatabase from "@/lib/connectDatabase";
import { formToObject } from "@/lib/formTransforms";
import { sanitizeModel } from "@/lib/sanitize";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { GetServerSideProps } from 'next';
import { Priorities } from "@/data/causePriority";

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

  //@ts-ignore
  finalBody.images = await Promise.all([].concat(body["images"]).map(async (value: File) => {
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

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)


  if (!session && process.env.ENV != "development") return new APIResponse({
    body: {},
    code: APICodes[401],
    message: APIMessages.UnAuthorized,
    status: APIStatus.Unauthorized
  }).response()

  await connectDatabase()

  const page = req.nextUrl.searchParams.get("page");
  const amountPerPage = req.nextUrl.searchParams.get("amountPerPage");
  const priority = req.nextUrl.searchParams.get("priority");


  const paginationConfiguration = {
    page: page ? parseInt(page) : 1,
    limit: amountPerPage ? parseInt(amountPerPage) : 10,
  }
  let query: { [key: string]: any } = {}


  if (priority) {
    const priorityIndex = Object.keys(Priorities).indexOf(priority as string)
    const priorityValue = Object.values(Priorities)[priorityIndex]
    //@ts-ignore
    if (priorityValue.sort) {
      //@ts-ignore
      paginationConfiguration.short = priorityValue.sort

    }
    //@ts-ignore
    if (priorityValue.query) {
      //@ts-ignore
      query = priorityValue.query as {
        [key: string]: string
      }
    }




    const dbCauses = await CauseModel.paginate(query, paginationConfiguration)

    if (!dbCauses.docs) return new APIResponse({
      body: {},
      code: APICodes[500],
      message: APIMessages.InternalServerError,
      status: APIStatus.InternalServerError
    }).response()

    return new APIResponse({
      body: dbCauses.docs.map(dbCause => {
        return sanitizeModel(dbCause)
      }),
      code: APICodes[200],
      message: APIMessages.OK,
      status: APIStatus.OK
    }).response()

  }
}