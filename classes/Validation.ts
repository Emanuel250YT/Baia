
import { z } from "zod";


export interface IValidation {
  uuid: string;
  cause: string;
  images: string[];
  createdAt: number;
  description: string;
  realValidation: boolean;
  wallet: string;
  objetive: string;
}

export const ZValidationCreate = z.object({
  cause: z.string(),
  images: z.union([z.array(z.object({
    size: z.number(),
    type: z.string(),
    name: z.string(),
    lastModified: z.number(),
  })), z.object({
    size: z.number(),
    type: z.string(),
    name: z.string(),
    lastModified: z.number(),
  })]),
  wallet: z.string(),
  description: z.string()
})

