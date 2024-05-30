import {
  getDataResponse,
  getGraphArr,
  getGraphBpm,
  getGraphCalStep,
} from "../../../../axios/api/serverApi";
import {
  graphBpm,
  graphCalStep,
  graphPulse,
} from "../../../../axios/interface/graphModal";

export const getBpm = async (
  eq: string,
  startDate: string,
  endDate: string
): Promise<graphBpm[]> => {
  const result = await getGraphBpm(
    `/mslbpm/webBpm?eq=${eq}&startDate=${startDate}&endDate=${endDate}`
  );
  return result;
};

export const getArr = async (
  eq: string,
  startDate: string,
  endDate: string,
  len: number
): Promise<graphPulse[]> => {
  const result = await getGraphArr(
    `/mslecgarr/graphArrCnt?eq=${eq}&startDate=${startDate}&endDate=${endDate}&len=${len}`
  );
  return result;
};

export const getCalStep = async (
  eq: string,
  startDate: string,
  endDate: string,
  len: number
): Promise<graphCalStep[]> => {
  const result = await getGraphCalStep(
    `/mslecgday/webDay?eq=${eq}&startDate=${startDate}&endDate=${endDate}&len=${len}`
  );
  return result;
};

export const getWritetimeList = async (
  eq: string,
  startDate: string,
  endDate: string
): Promise<string[]> => {
  const result: string[] = await getDataResponse(
    `/mslecgarr/arrWritetime?eq=${eq}&startDate=${startDate}&endDate=${endDate}`
  );
  return result;
};

export const getArrEcgList = async (
  eq: string,
  startDate: string
): Promise<string[]> => {
  const result: string[] = await getDataResponse(
    `/mslecgarr/arrWritetime?eq=${eq}&startDate=${startDate}&endDate=`
  );
  return result;
};
