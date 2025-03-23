
import { z } from "zod";


export interface IDonation {
  uuid: string;
  cause: string;
  wallet: string;
  createdAt: number,
  verified: boolean;
  amount: number;
  objetive: string;
}

export const ZDonationCreate = z.object({
  cause: z.string(),
  wallet: z.string(),
})

