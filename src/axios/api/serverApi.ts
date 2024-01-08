import axios, {Axios, AxiosRequestConfig } from 'axios'
import  APIResponse  from '../interface/response';
import { historyLast } from '../interface/history_last';
import { profileModal } from '../interface/profileModal';
import { graphBpm, graphCalStep, graphPulse } from '../interface/graphModal';
import { graphBpmHrvArr } from '../interface/graph';
import { yesterdayArr } from '../interface/arr';


const client: Axios = axios.create({
    baseURL: 'http://121.152.22.85:40080', //https://port-0-webbackend-2rrqq2blmpy5nvs.sel5.cloudtype.app/
    headers: {
      'Content-Type': 'application/json',
    }
  })

  //TODO: GET 메서드
   export const getData = async <T>(url:string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
    try {
        const response = await client.get<APIResponse<T>>(url, config);
        return response.data;
    } catch (error:any) {
      throw new Error(error.message);
    }
   };

<<<<<<< HEAD
   export const getOnlyArr = async (url:string, config?: AxiosRequestConfig): Promise<yesterdayArr> => {
    try {
        const response = await client.get<yesterdayArr>(url, config);
        return response.data;
    } catch (error:any) {
      throw new Error(error.message);
    }
   };

=======
>>>>>>> b611fe0e3fe55b057c982fa9de09dbff4a9cfc10
   export const getEcgTime = async (url:string, config?: AxiosRequestConfig): Promise<string[]> => {
    try {
        const response = await client.get<string[]>(url, config);
        return response.data;
    } catch (error:any) {
      throw new Error(error.message);
    }
   };
   
   export const getDataResponse = async <T>(url:string, config?: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await client.get<T>(url, config);
        return response.data;
    } catch (error:any) {
      throw new Error(error.message);
    }
   };

   export const getGraphBpmHrvArr= async <T>(url:string, config?: AxiosRequestConfig): Promise<graphBpmHrvArr[]> => {
    try {
        const response = await client.get<graphBpmHrvArr[]>(url, config);
        return response.data;
    } catch (error:any) {
      throw new Error(error.message);
    }
   };

   export const getGraphCalStep = async (url:string, config?: AxiosRequestConfig): Promise<graphCalStep[]> => {
    try {
        const response = await client.get<graphCalStep[]>(url, config);
        return response.data;
    } catch (error:any) {
      throw new Error(error.message);
    }
   };

   export const getGraphArr = async (url:string, config?: AxiosRequestConfig): Promise<graphPulse[]> => {
    try {
        const response = await client.get<graphPulse[]>(url, config);
        return response.data;
    } catch (error:any) {
      throw new Error(error.message);
    }
   };

   export const getGraphBpm = async (url:string, config?: AxiosRequestConfig): Promise<graphBpm[]> => {
    try {
        const response = await client.get<graphBpm[]>(url, config);
        return response.data;
    } catch (error:any) {
      throw new Error(error.message);
    }
   };

   export const getProfile = async (url:string, config?: AxiosRequestConfig): Promise<profileModal[]> => {
    try {
        const response = await client.get<profileModal[]>(url, config);
        return response.data;
    } catch (error:any) {
      throw new Error(error.message);
    }
   };

   export const getHistory = async (url:string, config?: AxiosRequestConfig): Promise<historyLast[]> => {
    try {
        const response = await client.get<historyLast[]>(url, config);
        return response.data;
    } catch (error:any) {
      throw new Error(error.message);
    }
   };

   export const getEcg = async (url:string, config?: AxiosRequestConfig): Promise<number[]> => {
    try {
        const response = await client.get<number[]>(url, config);
        return response.data;
    } catch (error:any) {
      throw new Error(error.message);
    }
   };

   //TODO: POST 메서드
export const postData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
  try {
    const response = await client.post<APIResponse<T>>(url, data, config);
    return response.data;
  } catch (error:any) {
    throw new Error(error.message);
  }
};

//TODO: PUT 메서드
export const putData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
  try {
    const response = await client.put<APIResponse<T>>(url, data, config);
    return response.data;
  } catch (error:any) {
    throw new Error(error.message);
  }
};

//TODO: Delete 메서드
export const deleteData = async <T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
  try {
    const response = await client.delete<APIResponse<T>>(url, config);
    return response.data;
  } catch (error:any) {
    throw new Error(error.message);
  }
};