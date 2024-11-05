import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BatteryCharging50Icon from "@mui/icons-material/BatteryCharging50";
import alarm from "../../../../assets/image/KakaoTalk_20231012_172309103_01.png";
import { Zoom, Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { modalValues } from "../../../../axios/interface/modalvalues";

type Props = {
  values: modalValues;
  battery: number;
};

export const ModalHeader = ({ values, battery }: Props) => {
  const [check, setCheck] = useState(false);
  const arrCnt = values.arrCnt;
  const arrCntRef = useRef<number>(arrCnt);
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    arrCntRef.current = arrCnt;
  }, []);

  const headerBox = {
    display: "flex",
    alignItems: "end",
  };

  const logoStyle = {
    width: 130,
    paddingBlockStart: 3,
    paddingInlineStart: 3,
    fontWeight: "bold",
    cursor: "default",
    ":hover": { color: "#5388F7", transform: "Scale(1.1)" },
  };

  const flex = "flex";
  const center = "center";

  const test = () => {
    setCheck((check) => !check);
  };

  useEffect(() => {
    const arrCheck = () => {
      if (
        arrCnt != 0 &&
        arrCntRef.current != 0 &&
        arrCntRef.current != arrCnt
      ) {
        arrCntRef.current = arrCnt;
        setCheck(!open);
      }
    };

    if (!open) arrCheck();
    else setOpen(false);

    const timer = setInterval(() => {
      setCheck(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [arrCnt]);

  const batteryMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {};

  return (
    <Box sx={headerBox}>
      <Box
        sx={{ display: flex, alignItems: center, position: "relative" }}
        onClick={test}
      >
        <Typography sx={logoStyle} id="title" variant="h6" component="h2">
          LOOKHEART
        </Typography>
      </Box>
      {<Zoom in={check}>{Headeralarm(values.writetime)}</Zoom>}
      <Tooltip placement="bottom-end" title={`${battery}%`}>
        <Box
          sx={{
            width: "80%",
            display: flex,
            alignItems: center,
            justifyContent: "end",
            paddingBlockEnd: 1,
            paddingInlineEnd: 3,
          }}
        >
          <BatteryCharging50Icon
            sx={{
              transform: "rotate(90deg)",
              textAlign: "center",
              ":hover": { color: "green", fontSize: "large" },
            }}
          />
        </Box>
      </Tooltip>
    </Box>
  );
};

const Headeralarm = (time: string) => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        border: 1,
        borderColor: "black",
        borderRadius: 5,
        width: 250,
        height: 35,
        bgcolor: "white",
        alignItems: "center",
        justifyContent: "center",
        top: 15,
        left: 50,
      }}
    >
      <Box
        component="img"
        sx={{ height: 30, width: 30, paddingRight: 1 }}
        src={alarm}
      />
      <Typography sx={{ fontSize: 13, fontWeight: "bold" }}>
        {"비정상맥박 발생! 시간:"}
      </Typography>
      <Typography sx={{ fontSize: 13 }}>{time.split(" ")[1]}</Typography>
    </Box>
  );
};
