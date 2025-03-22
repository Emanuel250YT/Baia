
import { GetBaseData } from "../baseMethod";
import { ICause } from "@/classes/Cause";


export async function GetAllCauses() {
  const causesData = await GetBaseData(process.env.NEXT_PUBLIC_API_WEB_BASE_URL! + "/causes")
  if (!causesData || causesData.code != 200) return null;
  return causesData.body as Array<ICause>;
}

const bundle = {
  GetAllCauses
}

export default bundle