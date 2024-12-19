import { Box, Typography } from "@mui/material";
import { ButtonChartBpm } from "../bodygraph/ChartButton";
import { useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { PickerSelectionState } from "@mui/x-date-pickers/internals";
import { Calendar } from "../../component/calendar";
import { getCalendarTime } from "../../../../../func/func";

type Props = {
  writetime: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  writetimeHandler: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  disabled: boolean;
};

export const WritetimeButton = ({
  writetime,
  setTime,
  writetimeHandler,
  disabled,
}: Props) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const calendarHandler = (
    value: any,
    _cal: PickerSelectionState | undefined
  ) => {
    setShowCalendar(false);
    const currentTime = getCalendarTime(value);
    setTime(currentTime);
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
        {writetime}
      </Typography>
      <CalendarMonthIcon
        onClick={(_e) => {
          setShowCalendar(!showCalendar);
        }}
        sx={{
          position: "absolute",
          top: 388,
          left: 235,
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
