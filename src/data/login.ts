import { getData, postData } from "../axios/api/serverApi";
import { getTime } from "../func/func";

export const tryLogin = async (email: string, pw: string): Promise<boolean> => {
  const data: any = await getData(
    `/msl/CheckLogin?empid=${email}&pw=${pw}&destroy=${true}`
  );
  return data?.includes("true");
};

export const saveLog = async (
  email: string,
  active: string
): Promise<boolean> => {
  let body = {
    kind: "web",
    gubun: "근로자",
    eq: email,
    eqname: "",
    writetime: getTime(),
    activity: active,
  };
  const data: any = await postData(`/admin_login_log/api_getdata`, body);
  return data.includes("true");
};
