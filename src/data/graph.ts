import { getGraphBpmHrvArr } from "../axios/api/serverApi";
import { graphBpmHrvArr } from "../axios/interface/graph";

export const getGraphBpmHrvArrData = async (eq:string,nowTime:string,time:string[]):Promise<graphBpmHrvArr[]> => {   
        const data:graphBpmHrvArr[] = await getGraphBpmHrvArr(`/mslbpm/webGraphBpmHrvArr?eq=${eq}&startDate=${nowTime}&endDate=${time[1]}`)   
        return data;   
 }  
