
import { z } from "zod";


export interface IDonation {
  uuid: string;
  cause: string;
  wallet: string;
  createdAt: number
}

export const ZDonationCreate = z.object({
  cause: z.string(),
  wallet: z.string(),
})

