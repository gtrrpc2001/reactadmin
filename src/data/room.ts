import { getHistory, getProfile } from "../axios/api/serverApi";

export const GetProfile = async (eq: string, startDate: string, endDate: string, url: string) => {
    const result = await getProfile(
        `/mslecgarr/arrCnt?eq=${eq}&startDate=${startDate}&endDate=${endDate}&name=${url}`
    );
    return result
}

export const GetHistory = async (eq: string, url: string) => {
    const result = await getHistory(`/mslLast/webTable?eq=${eq}&name=${url}`)
    return result
}
