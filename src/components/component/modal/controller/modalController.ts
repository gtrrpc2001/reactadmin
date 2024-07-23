import { userBpmType } from "../../../../axios/interface/bpmType";
import { footerIcon } from "../../../../axios/interface/footerIcon";
import {
  dayGubunButtonModal,
  graphModal,
  writetimeButtonModal,
} from "../../../../axios/interface/graphModal";
import { graphKindButton } from "../../../../axios/interface/graph";
import { historyLast } from "../../../../axios/interface/history_last";
import { modalValues } from "../../../../axios/interface/modalvalues";
import { getHour } from "../../../../func/func";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export const getHeartText = (arrCnt: number): string => {
  let value: string = "양호";
  if (arrCnt > 50 && arrCnt < 100) {
    value = "경고";
  } else if (arrCnt >= 100) {
    value = "위험";
  }
  return value;
};

export const getUserBpmType = (
  bpm: number,
  sleepTime: number,
  upTime: number,
  settingBpm: number
): userBpmType => {
  let bpmTypeList: userBpmType = { rest: true, activity: false, sleep: false };
  let nowHours = getHour();

  //설정 bpm  >= bpm 일경우
  if (sleepTime <= nowHours || upTime > nowHours) {
    bpmTypeList = { rest: false, activity: false, sleep: true };
  } else {
    if (settingBpm <= bpm)
      bpmTypeList = { rest: false, activity: true, sleep: false };
  }
  return bpmTypeList;
};

export const getValues = (data: historyLast[], eq: string): modalValues => {
  let modalList: modalValues = {
    writetime: "",
    bpm: 0,
    arrCnt: 0,
    actCal: 0,
    step: 0,
    temp: 0,
    distance: 0,
  };
  let row;
  for (var i = 0; i < data?.length; i++) {
    if (data[i].eq == eq) {
      row = data[i];
      modalList = {
        writetime: row.writetime,
        bpm: row.bpm,
        arrCnt: row.arrcnt,
        actCal: row.calexe,
        step: row.step,
        temp: row.temp,
        distance: row.distanceKM,
      };
      break;
    }
  }
  return modalList;
};

export const getDecimal = (value: number): number => {
  return value / 1000;
};

export const getClickFooter = (id: string): footerIcon => {
  const home = "home";
  const graph = "graph";
  const pulse = "pulse";
  const profile = "profile";
  let iconClick: footerIcon = {
    home: true,
    graph: false,
    pulse: false,
    profile: false,
  };
  switch (true) {
    case id.includes(graph):
      return { home: false, graph: true, pulse: false, profile: false };
    case id.includes(pulse):
      return { home: false, graph: false, pulse: true, profile: false };
    case id.includes(profile):
      return { home: false, graph: false, pulse: false, profile: true };
    default:
      return iconClick;
  }
};

export const getClickGraph = (id: string): graphModal => {
  const bpm = "bpm";
  const pulse = "pulse";
  const hrv = "hrv";
  const cal = "cal";
  const step = "step";
  let iconClick: graphModal = {
    bpm: true,
    pulse: false,
    hrv: false,
    cal: false,
    step: false,
  };
  switch (true) {
    case id.includes(pulse):
      return { bpm: false, pulse: true, hrv: false, cal: false, step: false };
    case id.includes(hrv):
      return { bpm: false, pulse: false, hrv: true, cal: false, step: false };
    case id.includes(cal):
      return { bpm: false, pulse: false, hrv: false, cal: true, step: false };
    case id.includes(step):
      return { bpm: false, pulse: false, hrv: false, cal: false, step: true };
    default:
      return iconClick;
  }
};

export const getClickWriteimteButton = (id: string): writetimeButtonModal => {
  const today = "today";
  const days2 = "days2";
  const days3 = "days3";
  let iconClick: writetimeButtonModal = {
    today: true,
    days2: false,
    days3: false,
  };
  switch (true) {
    case id.includes(days2):
      return { today: false, days2: true, days3: false };
    case id.includes(days3):
      return { today: false, days2: false, days3: true };
    default:
      return iconClick;
  }
};

export const getClickDayGubunButton = (id: string): dayGubunButtonModal => {
  const day = "day";
  const week = "week";
  const month = "month";
  const year = "year";
  let iconClick: dayGubunButtonModal = {
    day: true,
    week: false,
    month: false,
    year: false,
  };
  switch (true) {
    case id.includes(year):
      return { day: false, week: false, month: false, year: true };
    case id.includes(week):
      return { day: false, week: true, month: false, year: false };
    case id.includes(month):
      return { day: false, week: false, month: true, year: false };
    default:
      return iconClick;
  }
};

export const getClickGraphKindButton = (id: string): graphKindButton => {
  const bpm_hrv_arr = "bpm_hrv_arr";
  const cal_step = "cal_step";
  const ecg = "ecg";
  let iconClick: graphKindButton = {
    bpm_hrv_arr: true,
    cal_step: false,
    ecg: false,
  };
  switch (true) {
    case id == ecg:
      return { bpm_hrv_arr: false, cal_step: false, ecg: true };
    case id == cal_step:
      return { bpm_hrv_arr: false, cal_step: true, ecg: false };
    default:
      return iconClick;
  }
};

export const checkNull = (value: number | undefined) => {
  return value == null ? 0 : value;
};

const extendDayjs = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
};

export const getDayjs = (
  date: string,
  value: number,
  formatStyle: string,
  unit?: dayjs.ManipulateType
): string => {
  const tz = "Asia/Seoul";
  extendDayjs();
  var result = "";
  if (value == 0) {
    result = dayjs(new Date(date)).tz(tz).format(formatStyle);
  } else {
    result = dayjs(new Date(date)).add(value, unit).tz(tz).format(formatStyle);
  }
  return result;
};

export const getToday = (): string => {
  const tz = "Asia/Seoul";
  extendDayjs();
  const result = dayjs(new Date()).tz(tz).format("YYYY-MM-DD");
  return result;
};

export const getDayjsDay = (date: string): number => {
  const tz = "Asia/Seoul";
  extendDayjs();
  return dayjs(new Date(date)).tz(tz).day();
};

export const getWritetimeButtomValue = (
  writetime: string,
  num: number
): string => {
  const first = getDayjs(writetime, -num, "MM-DD", "days");
  const second = getDayjs(writetime, 0, "MM-DD");
  return `${first} ~ ${second}`;
};

export const compareToWritetime = (
  updateWritetime: string,
  originalWritetime: string,
  fromEffect: boolean = false
): boolean => {
  const time1Arr = originalWritetime?.split("-");
  const time2Arr = updateWritetime?.split("-");
  let bool = false;
  if (Number(time1Arr[0]) === Number(time2Arr[0])) {
    if (Number(time1Arr[1]) === Number(time2Arr[1])) {
      if (
        fromEffect
          ? Number(time1Arr[2]) === Number(time2Arr[2])
          : Number(time1Arr[2]) === (Number(time2Arr[2]) - 1)
      ) {
        bool = true;
      }
    }
  }
  return bool;
};

export const compareYearMonth = (
  updateWritetime: string,
  Writetime: string
): boolean => {
  const time1Arr = Writetime.split("-");
  const time2Arr = updateWritetime.split("-");
  let bool = false;
  if (Number(time1Arr[0]) == Number(time2Arr[0])) {
    if (Number(time1Arr[1]) == Number(time2Arr[1])) {
      bool = true;
    }
  }
  return bool;
};

export const compareFullYear = (
  updateWritetime: string,
  Writetime: string
): boolean => {
  const time1Arr = Writetime.split("-");
  const time2Arr = updateWritetime.split("-");
  let bool = false;
  if (Number(time1Arr[0]) == Number(time2Arr[0])) {
    bool = true;
  }
  return bool;
};

export const calculTime = (
  date: string,
  startValue: number,
  endValue: number,
  formatStyle: string,
  unit?: dayjs.ManipulateType
): string[] => {
  const startDate = getDayjs(date, startValue, formatStyle, unit);
  const endDate = getDayjs(date, endValue, formatStyle, unit);
  return [startDate, endDate];
};

export const compareDay = (
  id: string,
  updateWritetime: string,
  writetime: string
): boolean => {
  const currentWeek = selectWeek(writetime);
  const lastDay = currentWeek[currentWeek.length - 1];
  const nowWeek = selectWeek(updateWritetime)[currentWeek.length - 1];
  return id == "minus" ? false : lastDay == nowWeek;
};

export const compareMonth = (
  id: string,
  updateWritetime: string,
  writetime: string
): boolean => {
  const bool = compareYearMonth(updateWritetime, writetime);
  return id == "minus" ? false : bool;
};

export const compareYear = (
  id: string,
  updateWritetime: string,
  writetime: string
): boolean => {
  const bool = compareFullYear(updateWritetime, writetime);
  return id == "minus" ? false : bool;
};

export const selectTime = (writetime: string, num: number): string[] => {
  const startDate = getDayjs(writetime, -num, "YYYY-MM-DD", "days");
  return [startDate, writetime];
};

export const replaceYear = (time: string): string => {
  const times = time.split("-");
  return `${times[1]}-${times[2]}`;
};

export const getDate = (time: string): string => {
  const times = time.split(" ");
  return times[0];
};

export const getYearMonth = (time: string, num: number): string => {
  return getDayjs(time, num, "YY-MM", "month");
};

export const getYear = (time: string): string => {
  const times = time.split("-");
  return times[0];
};

export const selectWeek = (writetime: string): string[] => {
  var theDayOfWeek = getDayjsDay(writetime);
  var thisWeek = [];
  var j = 0;
  for (var i = 1; i < 8; i++) {
    var resultDay = getDayjs(writetime, i - theDayOfWeek, "YYYY-MM-DD", "days");
    thisWeek[j] = resultDay;
    j++;
  }
  return thisWeek;
};

export const selectWeekDate = (writetime: string): string[] => {
  var theDayOfWeek = getDayjsDay(writetime);
  var thisWeek = [];
  var j = 0;
  for (var i = 1; i < 8; i++) {
    var resultDay = getDayjs(writetime, i - theDayOfWeek, "DD", "days");
    thisWeek[j] = resultDay;
    j++;
  }
  return thisWeek;
};

export const getPulse = (
  writetime: string,
  data: any[],
  dayGubunButtonModal: dayGubunButtonModal
) => {
  const week = ["월", "화", "수", "목", "금", "토", "일"];
  if (dayGubunButtonModal.week) {
    let setData = [];
    const currentWeek = selectWeekDate(writetime);
    let j = 0;
    for (var i = 0; i < week.length; i++) {
      let bool = currentWeek[i] == data[j]?.writetime;
      setData.push({
        data: bool ? data[j]?.count : 0,
        xAxis: week[i],
      });
      if (bool) j++;
    }
    return setData;
  } else {
    try {
      return data?.map((d) => {
        return {
          data: d.count,
          xAxis: d.writetime,
        };
      });
    } catch {}
  }
};

export const getCalStep = (
  writetime: string,
  data: any[],
  iconSelect: graphModal,
  dayGubunButtonModal: dayGubunButtonModal
) => {
  const week = ["월", "화", "수", "목", "금", "토", "일"];
  const cal = iconSelect.cal;
  if (dayGubunButtonModal.week) {
    let setData = [];
    const currentWeek = selectWeekDate(writetime);
    let j = 0;
    for (var i = 0; i < week.length; i++) {
      let bool = currentWeek[i] == data[j]?.writetime;
      setData.push({
        data1: bool ? (cal ? data[j]?.cal : data[j]?.step) : 0,
        data2: bool ? (cal ? data[j]?.calexe : data[j]?.distanceKM) : 0,
        xAxis: week[i],
      });
      if (bool) j++;
    }
    return setData;
  } else {
    try {
      return data?.map((d) => {
        return {
          data1: cal ? d.cal : d.step,
          data2: cal ? d.calexe : d.distanceKM,
          xAxis: d.writetime,
        };
      });
    } catch {}
  }
};

export const graphSliceShow = (Count: number, length: number): number[] => {
  const endNum = 1000;
  if (Count == 1) {
    return [0, endNum];
  } else {
    if (Count * endNum > length) {
      return [(Count - 1) * endNum + 1, length];
    } else {
      return [(Count - 1) * endNum + 1, Count * endNum];
    }
  }
};

export const progressBarValue = (
  settingValue: number,
  value: number,
  check = false
): number => {
  try {
    if (check) {
      const km = settingValue * 1000;
      const calValue = value;
      const percent =
        (calValue / km) * 100 >= 100 ? 100 : (calValue / km) * 100;
      return percent;
    } else {
      const percent =
        (value / settingValue) * 100 >= 100
          ? 100
          : (value / settingValue) * 100;
      return percent;
    }
  } catch {
    return 0;
  }
};

export const getPulseEcgDataConverter = (result: string[]) => {
  let dataList: any[] = [];
  const getData = result?.map((value: any) => {
    const { ecgpacket } = value;
    if (ecgpacket?.length != 0) {
      const arr: string[] = ecgpacket?.split(",");
      return arr?.filter((value, index) => {
        if (index > 3) {
          dataList.push({ ecg: Number(value) });
          return value;
        }
      });
    } else {
      return dataList.push({ ecg: 0 });
    }
  });
  return dataList;
};
