import { getHistory } from "../axios/api/serverApi"

export const GetHistory = async (eq: string, url: string) => {
    const result = await getHistory(`/mslLast/webTable?eq=${eq}&name=${url}`)
    return result
}