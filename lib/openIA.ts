import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GetDetails() {

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        "role": "system",
        "content": [
          {
            "type": "input_text",
            "text": "Para cada descripción que proporciones, identifica los elementos perdidos en una catástrofe natural, categoriza cada elemento por su nivel de prioridad (\"primary\" o \"secondary\"), y proporciona un presupuesto estimado en dólares. Devuelve toda la información únicamente en formato JSON, siguiendo la estructura indicada, sin añadir respuestas adicionales.\n\n# Output Format\n\nDevuelve un JSON con la siguiente estructura para cada elemento encontrado en la descripción:\n- **priority**: (string) \"primary\" o \"secondary\"\n- **totalCost**: (number) Valor en dólares como presupuesto del costo total del elemento\n- **amount**: (number) Cantidad de elementos perdidos\n- **name**: (string) Nombre del producto en español\n\nEjemplo de JSON:\n```json\n[\n  {\"priority\": \"primary\", \"totalCost\": 500, \"amount\": 3, \"name\": \"botellas de agua\"},\n  {\"priority\": \"secondary\", \"totalCost\": 1200, \"amount\": 1, \"name\": \"televisor\"}\n]\n```\n\n# Notes\n\n- Asegúrate de identificar claramente si un elemento es de primera o segunda necesidad.\n- Asigna precios razonables a cada elemento con base en estándares comunes.\n- No incluyas ningún texto o explicación fuera del formato JSON."
          }
        ]
      },
      {
        "role": "user",
        "content": [
          {
            "type": "input_text",
            "text": "perdi un oso de peluche y un patito de ule, tengo un error en el siguiente codigo y no puedo encontrar la solucion import { cookies } from 'next/headers' import { NextRequest, NextResponse } from 'next/server' import { MiniAppWalletAuthSuccessPayload, verifySiweMessage } from '@worldcoin/minikit-js'\ninterface IRequestPayload { payload: MiniAppWalletAuthSuccessPayload nonce: string }\nexport async function POST(req: NextRequest) { const { payload, nonce } = (await req.json()) as IRequestPayload\nconsole.log(payload, nonce) if (nonce != cookies().get('siwe')?.value) { return NextResponse.json({ status: 'error', isValid: false, message: 'Invalid nonce', }) } try { const validMessage = await verifySiweMessage(payload, nonce) console.log(validMessage) return NextResponse.json({ status: 'success', isValid: validMessage.isValid, }) } catch (error: any) { return NextResponse.json({ status: 'error', isValid: false, message: error.message, }) } }"
          }
        ]
      },
      {
        "role": "assistant",

        "content": [
          //@ts-ignore
          {
            "type": "output_text",
            "text": "```json\n[\n  {\"priority\": \"secondary\", \"totalCost\": 20, \"amount\": 1, \"name\": \"oso de peluche\"},\n  {\"priority\": \"secondary\", \"totalCost\": 10, \"amount\": 1, \"name\": \"patito de ule\"}\n]\n```"
          }
        ]
      }
    ],
    text: {
      "format": {
        "type": "text"
      }
    },
    reasoning: {},
    tools: [],
    temperature: 1,
    max_output_tokens: 2048,
    top_p: 1,
    store: true
  });

  return response
}

