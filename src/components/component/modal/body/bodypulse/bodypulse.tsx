import { Box } from "@mui/material";
import { WritetimeList } from "./writetimeList";
import { WritetimeButton } from "./writetimeButton";
import {
  calculTime,
  compareToWritetime,
  getDate,
} from "../../controller/modalController";
import { useState } from "react";
import { PulseChart } from "./pulseChart";

type Props = {
  eq: string;
  startTime: string;
  koreaTime: string;
};
export const BodyPulse = ({ eq, startTime }: Props) => {
  const [writetime, setWritetime] = useState(getDate(startTime)); //startTime
  // const [gijunTime,setGijunTime] = useState(koreaTime)
  const [currentTime, setCurrentTime] = useState(startTime);
  const [disabled, setDisabled] = useState(true);
  const [writetimes, setWritetimes] = useState<any[]>([]);
  const [id, setId] = useState<string>("");

  const setValue = (id: string) => {
    const plusDate = calculTime(writetime, -1, 1, "YYYY-MM-DD", "days");
    if (id == "plus") {
      setWritetime(plusDate[1]);
    } else {
      setWritetime(plusDate[0]);
    }
  };

  const writetimeHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const id = e?.currentTarget?.id;
    if (id == "plus") {
      if (!compareToWritetime(getDate(startTime), writetime)) {
        setValue("plus");
        setDisabled(false);
      } else {
        setValue("plus");
        setDisabled(true);
      }
    } else {
      setValue("minus");
      setDisabled(false);
    }
  };

  const listItemHandler = (id: string) => {
    const { writetime } = writetimes?.find((_, index) => index + 1 == +id);
    setCurrentTime(writetime);
    setId(id);
  };

  return (
    <Box sx={{ height: 625 }}>
      <PulseChart eq={eq} time={currentTime} />
      <WritetimeButton
        writetime={writetime}
        setTime={setWritetime}
        disabled={disabled}
        writetimeHandler={writetimeHandler}
      />
      <WritetimeList
        writetime={writetime}
        id={id}
        list={writetimes}
        setList={setWritetimes}
        handler={listItemHandler}
        eq={eq}
      />
    </Box>
  );
};
