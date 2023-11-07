import { getGraphBpm } from "../../../../axios/api/serverApi"
import { graphBpm } from "../../../../axios/interface/graphModal"

export const getBpm = async(eq:string,startDate:string,endDate:string):Promise<graphBpm[]> => {
    const result = await getGraphBpm(`/mslbpm/webBpm?eq=${eq}&startDate=${startDate}&endDate=${endDate}`)
    return result
}