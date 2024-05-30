import dayjs from "dayjs";

export const getTime = (): string => {
  return dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss");
};

export const getHour = (): number => {
  const today = new Date();
  return today?.getHours();
};

export const getCalendarTime = (value: any): string => {
  const { $D, $M, $y } = value;
  const month = $M + 1 < 10 ? `0${$M + 1}` : $M + 1;
  const date = $D < 10 ? `0${$D}` : $D;
  return `${$y}-${month}-${date}`;
};

export const getWritetimeSelectHour_Min = (writetime: string) => {
  const removeDate = writetime?.split(" ")[1];
  const getHourMin = removeDate?.split(":");
  const value = `${getHourMin[0]}:${getHourMin[1]}`;
  return value;
};

export const setWindowLoginItems = (loginCheck: string, userId: string) => {
  window.localStorage.setItem("isLoginSuv", loginCheck);
  window.localStorage.setItem("isUserId", userId);
};
