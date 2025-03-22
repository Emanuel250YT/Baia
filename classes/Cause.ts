
import { z } from "zod";


export interface ICause {
  uuid: string;
  owner: string;
  place: string;
  description: string;
  profile: string;
  cause: string;
  images: string[];
  createdAt: number;
  fundsLimit: number;
  verificationLevel: string;
  detail: object;
  wallet: string;
  pendingValuation: boolean,
  funds: number,
  validations: number
}

export const ZCauseCreate = z.object({
  place: z.string(),
  description: z.string(),
  owner: z.string(),
  profile: z.object({
    size: z.number(),
    type: z.string(),
    name: z.string(),
    lastModified: z.number(),
  }),
  cause: z.string(),
  wallet: z.string(),
  images: z.array(z.object({
    size: z.number(),
    type: z.string(),
    name: z.string(),
    lastModified: z.number(),
  })),
})

