import { getEcg, getEcgTime, getGraphBpmHrvArr } from "../axios/api/serverApi";
import { graphBpmHrvArr } from "../axios/interface/graph";

export const getGraphBpmHrvArrData = async (eq:string,nowTime:string,time:string[]):Promise<graphBpmHrvArr[]> => {   
        const data:graphBpmHrvArr[] = await getGraphBpmHrvArr(`/mslbpm/webGraphBpmHrvArr?eq=${eq}&startDate=${nowTime}&endDate=${time[1]}`)   
        return data;   
 }  

 export const getGraphEcgTime = async (eq:string,nowTime:string,time:string[]):Promise<any[]> => {         
        const data:any[] = await getEcgTime(`/mslecg/EcgTime?eq=${eq}&startDate=${nowTime}&endDate=${time[1]}`)   
        return data;   
 }

 export const getGraphEcgValue = async (eq:string,startTime:string,endTime:string):Promise<number[]> => {       
       const data:number[] = await getEcg(`/mslecg/GraphEcg?eq=${eq}&startDate=${startTime}&endDate=${endTime}`)
       return data;
 }

 export const getTest = async (eq:string,startTime:string,endTime:string):Promise<any[]> => {       
       const data:any[] = await getEcgTime(`/mslecg/ecgTest?eq=${eq}&startDate=${startTime}&endDate=${endTime}`)
       return data;
 }