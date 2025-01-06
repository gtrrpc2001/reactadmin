import {
  getData,
  getEcg,
  getEcgTime,
  getGraphBpmHrvArr,
  getGraphEcg,
  getProfile,
} from "../axios/api/serverApi";
import { graphBpmHrvArr } from "../axios/interface/graph";

export const getGraphBpmHrvArrData = async (
  eq: string,
  nowTime: string,
  time: string[],
  url: string
): Promise<graphBpmHrvArr[]> => {
  const data: graphBpmHrvArr[] = await getGraphBpmHrvArr(
    `/mslbpm/webGraphBpmHrvArr?eq=${eq}&startDate=${nowTime}&endDate=${time[1]}&name=${url}`
  );
  return data;
};

export const getGraphEcgTime = async (
  eq: string,
  nowTime: string,
  time: string[],
  url: string
): Promise<any[]> => {
  const data: any[] = await getEcgTime(
    `/mslecgbyte/EcgTime?eq=${eq}&startDate=${nowTime}&endDate=${time[1]}&name=${url}`
  );
  return data;
};

export const getGraphEcgValue = async (
  eq: string,
  startTime: string,
  endTime: string,
  url: string
): Promise<{ ecg: number[]; writetime: string }[]> => {
  const data = getGraphEcg(
    `/mslecgbyte/GraphEcg?eq=${eq}&startDate=${startTime}&endDate=${endTime}&name=${url}`
  );
  return data;
};

export const getManagerCheck = async (email: string, url: string): Promise<boolean> => {
  const data: any = await getData(`/msl/managerCheck?empid=${email}&name=${url}`);
  return data;
};

export const GetProfile = async (eq: string, url: string) => {
  const profile = await getProfile(`/mslecgarr/arrCnt?eq=${eq}&name=${url}`);
  return profile;
}

export const GetEcg = async (eq: string, startDate: string, url: string) => {
  const result = await getEcg(`/mslecgbyte/Ecg?eq=${eq}&startDate=${startDate}&name=${url}`);
  return result
}

