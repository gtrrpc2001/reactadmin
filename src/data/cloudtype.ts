import { postData } from "../axios/api/serverApi";
import { CloudTypeData } from "../axios/interface/cloudtype";
import { decrypt, encrypt } from "../func/crypto";

export const getCloudTypeData = async (): Promise<CloudTypeData[]> => {
    const data = await postData<string>('/CloudType/stat');
    const decryptData = decrypt<CloudTypeData[]>(data);
    return decryptData;
};

export const setCloudTypeStart = async (body: any): Promise<void> => {
    await postData<void>('/CloudType/start', { data: encrypt(body) });
};

export const setCloudTypeStop = async (body: any): Promise<void> => {
    await postData<void>('/CloudType/stop', { data: encrypt(body) });
};