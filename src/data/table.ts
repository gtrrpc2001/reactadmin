import { getProfile } from "../axios/api/serverApi";
import { profileModal } from "../axios/interface/profileModal";

export const GetProfile = async (
    eq: string,
    startDate: string,
    endDate: string, url: string
): Promise<profileModal[]> => {
    const result = await getProfile(
        `/mslecgarr/arrCnt?eq=${eq}&startDate=${startDate}&endDate=${endDate}&name=${url}`
    );
    return result;
};