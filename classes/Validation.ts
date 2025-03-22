
import { z } from "zod";


export interface IValidation {
  uuid: string;
  cause: string;
  images: string[];
  createdAt: number;
  description: string;
  realValidation: string;
}

export const ZValidationCreate = z.object({
  cause: z.string(),
  images: z.object({
    size: z.number(),
    type: z.string(),
    name: z.string(),
    lastModified: z.number(),
  }),
  description: z.string()
})

