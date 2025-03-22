
import { GetBaseData } from "../baseMethod";
import { ICause } from "@/classes/Cause";
import { PrioritiesKeys } from "@/data/causePriority";

interface Filter {
  priority: keyof typeof PrioritiesKeys
}

export async function GetAllCauses(filter?: Filter): Promise<Array<ICause> | null> {
  const causesData = await GetBaseData(process.env.NEXT_PUBLIC_API_WEB_BASE_URL! + "/causes" + filter ? `?priority=${filter?.priority}` : "");
  if (!causesData || causesData.code != 200) return null;
  return causesData.body as Array<ICause>;
}

const bundle = {
  GetAllCauses
}



export default bundle