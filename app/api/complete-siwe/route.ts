import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { MiniAppWalletAuthSuccessPayload, verifySiweMessage } from '@worldcoin/minikit-js'
import { APIResponse, APICodes, APIMessages, APIStatus } from '@/classes/APIResponses'
import connectDatabase from '@/lib/connectDatabase'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'

interface IRequestPayload {
  payload: MiniAppWalletAuthSuccessPayload
  nonce: string
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

  const { payload, nonce } = (await req.json()) as IRequestPayload

  if (nonce != cookies().get('siwe')?.value) {
    return NextResponse.json({
      status: 'error',
      isValid: false,
      message: 'Invalid nonce',
    })
  }
  try {
    const validMessage = await verifySiweMessage(payload, nonce)
    console.log(validMessage)
    return NextResponse.json({
      status: 'success',
      isValid: validMessage.isValid,
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      isValid: false,
      message: error.message,
    })
  }
}
