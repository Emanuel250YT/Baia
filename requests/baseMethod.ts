import { IAPIResponse } from "@/classes/APIResponses"

export async function GetBaseData(path: string): Promise<IAPIResponse | null> {
  const authCookie = document.cookie


  const data = await fetch(path, {
    headers: {
      Cookies: `authjs.csrf-token=${authCookie}`
    }
  })
  const dataJSON = await data.json().catch(err => {
    if (err) return null
  })

  if (!dataJSON) return null;
  return dataJSON as IAPIResponse
}


export async function PostBaseData(path: string, body: string | FormData): Promise<IAPIResponse | null> {
  const authCookie = document.cookie


  const data = await fetch(path, {
    headers: {
      Cookies: `authjs.csrf-token=${authCookie}`
    },
    body: body,
    method: 'POST'
  })
  const dataJSON = await data.json().catch(err => {
    if (err) return null
  })

  if (!dataJSON) return null;
  return dataJSON as IAPIResponse
}
