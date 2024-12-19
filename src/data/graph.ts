import {
  getData,
  getEcgTime,
  getGraphBpmHrvArr,
  getGraphEcg,
} from "../axios/api/serverApi";
import { graphBpmHrvArr } from "../axios/interface/graph";

export const getGraphBpmHrvArrData = async (
  eq: string,
  nowTime: string,
  time: string[]
): Promise<graphBpmHrvArr[]> => {
  const data: graphBpmHrvArr[] = await getGraphBpmHrvArr(
    `/mslbpm/webGraphBpmHrvArr?eq=${eq}&startDate=${nowTime}&endDate=${time[1]}`
  );
  return data;
};

export const getGraphEcgTime = async (
  eq: string,
  nowTime: string,
  time: string[]
): Promise<any[]> => {
  const data: any[] = await getEcgTime(
    `/mslecgbyte/EcgTime?eq=${eq}&startDate=${nowTime}&endDate=${time[1]}`
  );
  return data;
};

export const getGraphEcgValue = async (
  eq: string,
  startTime: string,
  endTime: string
): Promise<{ ecg: number[]; writetime: string }[]> => {
  const data = getGraphEcg(
    `/mslecgbyte/GraphEcg?eq=${eq}&startDate=${startTime}&endDate=${endTime}`
  );
  return data;
};

export const getManagerCheck = async (email: string): Promise<boolean> => {
  const data: any = await getData(`/msl/managerCheck?empid=${email}`);
  return data;
};
