import { getGraphBpmHrvArr } from "../axios/api/serverApi";
import { graphBpmHrvArr } from "../axios/interface/graph";

export const getGraphBpmHrvArrData = async (eq:string,time:string[]):Promise<graphBpmHrvArr[]> => {   
        const data:graphBpmHrvArr[] = await getGraphBpmHrvArr(`/mslbpm/webGraphBpmHrvArr?eq=${eq}&startDate=${time[0]} 23:59:59&endDate=${time[1]}`)   
        return data;   
 }  