import dayjs from "dayjs";
import { NavigateFunction, To } from "react-router-dom";

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

export const handleAnimateNext = (
  to: To,
  setFunc: React.Dispatch<React.SetStateAction<{
    opacity: number;
    x: number;
  }>>,
  nav: NavigateFunction
) => {
  setFunc({ opacity: 0, x: -100 });
  nav(to, { state: { pageStatus: "next" } });
}

export const handleAnimatePrev = (
  to: To,
  setFunc: React.Dispatch<React.SetStateAction<{
    opacity: number;
    x: number;
  }>>,
  nav: NavigateFunction
) => {
  setFunc({ opacity: 0, x: 100 });
  nav(to, { state: { pageStatus: "prev" } });
}

export const handleAnimateInit = (
  to: To,
  setFunc: React.Dispatch<React.SetStateAction<{
    opacity: number;
    x: number;
  }>>,
  nav: NavigateFunction
) => {
  setFunc({ opacity: 0, x: 0 });
  nav(to, { state: { pageStatus: "init" } });
}

export const setInitialParams = (pageStatus: string) => {
  switch (pageStatus) {
    case "init":
      return { opacity: 0, x: 1 };
    case "next":
      return { opacity: 0, x: 100 };
    case "prev":
      return { opacity: 0, x: -100 };
    default:
      return { opacity: 0, x: 0 };
  }
}
