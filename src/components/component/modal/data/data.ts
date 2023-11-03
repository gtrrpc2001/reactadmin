import { getGraphBpm } from "../../../../axios/api/serverApi"
import { graphBpm } from "../../../../axios/interface/graphModal"
import { getTime } from "../../../../func/func"

export const getBpm = async(eq:string):Promise<graphBpm[]> => {
    const result = await getGraphBpm(`/mslbpm/webBpm?eq=${eq}&startDate=${getTime(false,true,1)}&endDate=${getTime(false)}`)
    return result
}