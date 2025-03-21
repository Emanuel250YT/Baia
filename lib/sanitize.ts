
import { Document } from "mongoose"
import { NextRequest } from "next/server"

export function sanitizeModel(obj: Document, excludeParams?: Array<string>, includeParams?: Array<string>) {

  const params = ["_id", "password", "__v", "clientSecret"].concat(...(excludeParams ? excludeParams : []))

  if (!includeParams) includeParams = []

  params.forEach(element => {
    //@ts-ignore
    if (!includeParams.includes(element)) delete obj._doc[element]
  })

  //@ts-ignore
  return obj._doc as Object
}


