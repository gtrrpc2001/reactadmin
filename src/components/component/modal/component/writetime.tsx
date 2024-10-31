import { Box, Typography } from "@mui/material";
import { ButtonChartBpm } from "../body/bodygraph/ChartButton";
import { useEffect, useState } from "react";
import {
  dayGubunButtonModal,
  graphModal,
  writetimeButtonModal,
} from "../../../../axios/interface/graphModal";
import {
  calculTime,
  compareToWritetime,
  getYearMonth,
  getWritetimeButtomValue,
  replaceYear,
  selectWeek,
  getYear,
  compareDay,
  compareMonth,
  compareYear,
} from "../controller/modalController";
import {
  bpmGraphActions,
  barGraphActions,
  writetimeGraphActions,
} from "../../../createslice/createslices";
import { getArr, getBpm, getCalStep } from "../data/data";
import { useDispatch } from "react-redux";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Calendar } from "../component/calendar";
import { getCalendarTime } from "../../../../func/func";
import { PickerSelectionState } from "@mui/x-date-pickers/internals";

type Props = {
  iconSelect: graphModal;
  clickWritetimeButton: writetimeButtonModal;
  clickDayGubunButton: dayGubunButtonModal;
  eq: string;
  startTime: string;
};

export const Writetime = ({
  iconSelect,
  clickWritetimeButton,
  clickDayGubunButton,
  eq,
  startTime,
}: Props) => {
  const [text, setText] = useState(startTime);
  const [disabled, setDisabled] = useState(true);
  const [originalWritetime, setOriginalWritetime] = useState(startTime);
  const GraphValue = useDispatch();
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [calendarPosition, setCalendarPosition] = useState<number>(204);

  useEffect(() => {
    switch (true) {
      case iconSelect.cal || iconSelect.step || iconSelect.pulse:
        setCalendarPosition(238);
        break;
      default:
        setCalendarPosition(204);
        break;
    }
  }, [iconSelect]);

  const setValue = (id: string, plusDate: string[]) => {
    if (id == "plus") {
      setOriginalWritetime(plusDate[1]);
    } else {
      setOriginalWritetime(plusDate[0]);
    }
  };

  const writetimeButtonIconSelect = (id: string) => {
    let plusDate: string[] = [];
    switch (true) {
      case clickDayGubunButton.week:
        if (!compareDay(id, startTime, originalWritetime)) {
          plusDate = calculTime(originalWritetime, -7, 7, "YYYY-MM-DD", "days");
          setDisabled(false);
          setValue(id, plusDate);
        } else {
          setDisabled(true);
        }
        break;
      case clickDayGubunButton.month:
        if (!compareMonth(id, startTime, originalWritetime)) {
          plusDate = calculTime(
            originalWritetime,
            -1,
            1,
            "YYYY-MM-DD",
            "month"
          );
          setDisabled(false);
          setValue(id, plusDate);
        } else {
          setDisabled(true);
        }
        break;
      case clickDayGubunButton.year:
        if (!compareYear(id, startTime, originalWritetime)) {
          plusDate = calculTime(originalWritetime, -1, 1, "YYYY-MM-DD", "year");
          setDisabled(false);
          setValue(id, plusDate);
        } else {
          setDisabled(true);
        }
        break;
      default:
        plusDate = calculTime(originalWritetime, -1, 1, "YYYY-MM-DD", "day");
        setValue(id, plusDate);
        break;
    }
  };

  const getWritetime = async (id: string) => {
    let plusDate: string[] = [];
    switch (true) {
      case iconSelect.pulse:
        writetimeButtonIconSelect(id);
        break;
      case iconSelect.cal:
        writetimeButtonIconSelect(id);
        break;
      case iconSelect.step:
        writetimeButtonIconSelect(id);
        break;
      default:
        plusDate = calculTime(originalWritetime, -1, 1, "YYYY-MM-DD", "day");
        setValue(id, plusDate);
        break;
    }
  };

  const setEffectFunc = () => {
    setDisabled(compareToWritetime(startTime, originalWritetime, true));
    getTimeChangeFromButton_test(originalWritetime);
  };

  useEffect(() => {
    const today = startTime;
    if (originalWritetime == today) {
      setEffectFunc();
    } else {
      setOriginalWritetime(today);
    }
  }, [iconSelect]);

  useEffect(() => {
    setEffectFunc();
  }, [originalWritetime, clickWritetimeButton, clickDayGubunButton]);

  const defaultWritetimeData = async (
    writetime: string,
    stressCheck: boolean = false
  ) => {
    const timeOne = calculTime(writetime, 0, 1, "YYYY-MM-DD", "day");
    GraphValue(
      bpmGraphActions.value(
        await getBpm(eq, timeOne[0], timeOne[1], stressCheck)
      )
    );
    setText(writetime);
  };

  const bpm_hrv_stress = async (
    writetime: string,
    stressCheck: boolean = false
  ) => {
    if (iconSelect.stress) {
      await defaultWritetimeData(writetime, stressCheck);
    } else {
      switch (true) {
        case clickWritetimeButton?.days2:
          const time = calculTime(writetime, -1, 1, "YYYY-MM-DD", "day");
          GraphValue(
            bpmGraphActions.value(
              await getBpm(eq, time[0], time[1], stressCheck)
            )
          );
          setText(getWritetimeButtomValue(writetime, 1));

          break;
        case clickWritetimeButton?.days3:
          const times = calculTime(writetime, -2, 1, "YYYY-MM-DD", "day");
          GraphValue(
            bpmGraphActions.value(
              await getBpm(eq, times[0], times[1], stressCheck)
            )
          );
          setText(getWritetimeButtomValue(writetime, 2));
          break;
        default:
          await defaultWritetimeData(writetime, stressCheck);
          break;
      }
    }
  };

  const getWeek = async (writetime: string) => {
    const currentWeek = selectWeek(writetime);
    const firstDay = currentWeek[0];
    const lastDay = currentWeek[currentWeek.length - 1];
    const endDate = calculTime(lastDay, 0, 1, "YYYY-MM-DD", "day")[1];
    await pulseCalStepSelectData(eq, firstDay, endDate, 10);
    const setFirstDay = replaceYear(firstDay);
    const setLastDay = replaceYear(lastDay);
    setText(`${setFirstDay} ~ ${setLastDay}`);
  };

  const pulseCalStepSelectData = async (
    eq: string,
    startDate: string,
    endDate: string,
    len: number
  ) => {
    switch (true) {
      case iconSelect.pulse:
        return GraphValue(
          barGraphActions.value(await getArr(eq, startDate, endDate, len))
        );
      default:
        return GraphValue(
          barGraphActions.value(await getCalStep(eq, startDate, endDate, len))
        );
    }
  };

  const pulseCalStepWritetimeGubun = async (writetime: string) => {
    switch (true) {
      case clickDayGubunButton.week:
        await getWeek(writetime);
        break;
      case clickDayGubunButton.month:
        const getYM = getYearMonth(writetime, 0);
        const getNextMonth = getYearMonth(writetime, 1);
        await pulseCalStepSelectData(
          eq,
          `${getYM}-01`,
          `${getNextMonth}-01`,
          10
        );
        setText(getYM);
        break;
      case clickDayGubunButton.year:
        const Y = getYear(writetime);
        await pulseCalStepSelectData(
          eq,
          `${Y}-01-01`,
          `${Y}-12-31 23:59:59`,
          7
        );
        setText(Y);
        break;
      default:
        const time = calculTime(writetime, 0, 1, "YYYY-MM-DD", "day");
        await pulseCalStepSelectData(eq, writetime, time[1], 13);
        setText(writetime);
        break;
    }
  };

  const gubunIconButton = async (writetime: string) => {
    switch (true) {
      case iconSelect.pulse:
        pulseCalStepWritetimeGubun(writetime);
        break;
      case iconSelect.cal:
        pulseCalStepWritetimeGubun(writetime);
        break;
      case iconSelect.step:
        pulseCalStepWritetimeGubun(writetime);
        break;
      case iconSelect.stress:
        bpm_hrv_stress(writetime, true);
        break;
      default:
        await bpm_hrv_stress(writetime);
        break;
    }
  };

  const getTimeChangeFromButton_test = async (time: string) => {
    GraphValue(writetimeGraphActions.value(time));
    gubunIconButton(time);
    setOriginalWritetime(time);
  };

  const getHandler = async (id: string, bool: boolean) => {
    await getWritetime(id);
    setDisabled(bool);
  };

  const writetimeHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const id = e?.currentTarget?.id;
    if (id == "plus") {
      if (!compareToWritetime(startTime, originalWritetime)) {
        getHandler("plus", false);
      } else {
        getHandler("plus", true);
      }
    } else {
      getHandler("minus", false);
    }
  };

  const calendarHandler = (
    value: any,
    cal: PickerSelectionState | undefined
  ) => {
    setShowCalendar(false);
    const currentTime = getCalendarTime(value);
    setOriginalWritetime(currentTime);
  };

  return (
    <Box
      sx={{
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ButtonChartBpm
        id="minus"
        bgColor="#a8a7a7"
        Handler={(e) => writetimeHandler(e)}
        front={false}
      />
      <Typography
        sx={{
          width: 110,
          textAlign: "center",
          fontWeight: "bold",
          marginLeft: 7,
          marginRight: 7,
          ":hover": { cursor: "default" },
        }}
      >
        {text}
      </Typography>
      <CalendarMonthIcon
        onClick={(e) => {
          setShowCalendar(!showCalendar);
        }}
        sx={{
          position: "absolute",
          bottom: calendarPosition,
          left: 232,
          ":hover": { cursor: "pointer" },
        }}
      />
      {showCalendar && <Calendar handler={calendarHandler} />}
      <ButtonChartBpm
        id="plus"
        disabled={disabled}
        bgColor="#a8a7a7"
        Handler={(e) => writetimeHandler(e)}
        front={true}
      />
    </Box>
  );
};
