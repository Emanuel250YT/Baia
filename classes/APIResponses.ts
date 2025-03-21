import { NextResponse } from "next/server";

// API MESSAGES
export const APIMessages = {
  OK: "OK",
  UnAuthorized: "Unauthorized",
  BadRequest: "Bad request",
  InternalServerError: "Internal error",
}

export type APIMessagesType = typeof APIMessages[keyof typeof APIMessages];


export interface IAPIMessages {
  message: string | APIMessagesType
}
// -------------------------------

// API CODES
export const APICodes = {
  200: 200,
  400: 400,
  500: 500,
  401: 401
}

export type APICodesType = typeof APICodes[keyof typeof APICodes];


export interface IAPICodes {
  code: number | APICodesType
}

// ------------------------------

// API STATUS

export const APIStatus = {
  BadRequest: "Bad request",
  Error: "Error",
  Success: "Success",
  InternalServerError: "Internal server error",
  Unauthorized: "Unauthorized",
  OK: "OK"
}

export type APIStatusType = typeof APIStatus[keyof typeof APIStatus];

// -------------------------

export interface IAPIResponse extends IAPIMessages, IAPICodes {
  status: APIStatusType | string
  body: { [key: string]: any; } | null
}

export class APIResponse implements IAPIResponse {
  code: number;
  message: string;
  status: string;
  body: { [key: string]: any; };

  constructor(data: IAPIResponse) {
    this.code = data.code ?? APICodes[200]
    this.message = data.message ?? APIStatus.OK
    this.status = data.status ?? APIStatus.OK
    this.body = data.body ?? {}
  }

  response() {
    return NextResponse.json({
      body: this.body,
      code: this.code,
      status: this.code,
      message: this.message
    }, { status: this.code, statusText: this.status })
  }
}
