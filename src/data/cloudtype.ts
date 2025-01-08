import { postData } from "../axios/api/serverApi";
import { CloudTypeData } from "../axios/interface/cloudtype";

export const getCloudTypeData = async (): Promise<CloudTypeData[]> => {
    const data = await postData<CloudTypeData[]>('/CloudType/stat');
    return data;
};

export const setCloudTypeStart = async (body: any): Promise<void> => {
    await postData<void>('/CloudType/start', body);
};

export const setCloudTypeStop = async (body: any): Promise<void> => {
    await postData<void>('/CloudType/stop', body);
};