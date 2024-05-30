import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { graphKindButton } from "../../axios/interface/graph";
import { TimeList } from "./userList";
import { getGraphEcgTime, getManagerCheck } from "../../data/graph";
import { calculTime } from "../../components/component/modal/controller/modalController";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

type Props = {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onEcgTimeClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  excelButtonClick: () => void;
  ecgData: any[];
  fristItemWidth: number;
  kindButton: graphKindButton;
  eq: string;
  time: string;
  id: string;
};

export const GraphKindButton = ({
  onClick,
  onEcgTimeClick,
  ecgData,
  eq,
  id,
  time,
  kindButton,
  fristItemWidth,
  excelButtonClick,
}: Props) => {
  const [defaultColor, setdefaultColor] = useState("gray"); //#ef507b
  const [selectColor, setSelectColor] = useState("#5388F7");
  const [listClick, setListClick] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [check, setCheck] = useState<boolean>(true);
  const [isManager, setIsManager] = useState<boolean>(false);
  const refManager = useRef<boolean>(false);
  const eqSelector = useSelector<RootState, string>((state) => state.eq);
  const border = 2;
  const borderRadius = 3;
  const marginLeft = 1;
  const bpm_hrv_arr = kindButton.bpm_hrv_arr ? selectColor : defaultColor;
  const cal_step = kindButton.cal_step ? selectColor : defaultColor;
  const ecg = kindButton.ecg ? selectColor : defaultColor;
  const sx = {
    border: border,
    borderRadius: borderRadius,
    width: fristItemWidth,
    textAlign: "center",
    marginLeft: marginLeft,
    ":hover": { cursor: "pointer" },
  };
  useEffect(() => {
    async function getData() {
      const times = calculTime(time, -1, 1, "YYYY-MM-DD", "days");
      const result = await getGraphEcgTime(eq, time, times);
      setData(result);
      setCheck(true);
    }
    if (listClick && time != "" && eq != "" && check == false) getData();
  }, [listClick]);

  useEffect(() => {
    setCheck(false);
    setListClick(false);
  }, [time, eq]);

  const getTimeList = () => {
    return (
      <Box sx={{ position: "absolute", right: check ? 410 : 520, zIndex: 1 }}>
        {check ? (
          <TimeList
            timeList={data}
            handler={onEcgTimeClick}
            id={id}
            width={270}
            height={400}
          />
        ) : (
          <CircularProgress color="primary" />
        )}
      </Box>
    );
  };

  useEffect(() => {
    const ManagerCheck = async () => {
      try {
        if (process.env.REACT_APP_DEPLOY) {
          if (!refManager.current) {
            const result = await getManagerCheck(eqSelector);
            refManager.current = result;
            setIsManager(result);
          }
        }
      } catch (E) {
        console.log(E);
      }
    };

    ManagerCheck();
  }, []);

  const excelDown = () => {
    if (process.env.REACT_APP_DEPLOY) {
      return (
        ecgData.length != 0 &&
        isManager && (
          <Button onClick={excelButtonClick}>심전도 데이터 다운</Button>
        )
      );
    } else {
      return (
        ecgData.length != 0 && (
          <Button onClick={excelButtonClick}>심전도 데이터 다운</Button>
        )
      );
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        id="bpm_hrv_arr"
        onClick={(e) => onClick(e)}
        sx={[sx, { borderColor: bpm_hrv_arr }]}
      >
        <Typography>맥박,맥박변동률,비정상맥박</Typography>
      </Box>
      <Box
        id="cal_step"
        onClick={(e) => onClick(e)}
        sx={[sx, { borderColor: cal_step }]}
      >
        <Typography>칼로리,걸음</Typography>
      </Box>
      <Box id="ecg" onClick={(e) => onClick(e)} sx={[sx, { borderColor: ecg }]}>
        <Typography>심전도</Typography>
      </Box>
      {kindButton.ecg && (
        <>
          <Box
            id="timeList"
            sx={[
              sx,
              {
                borderColor: kindButton.ecg
                  ? listClick
                    ? selectColor
                    : defaultColor
                  : defaultColor,
              },
            ]}
            onClick={(e) => {
              setListClick(!listClick);
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography>심전도 시간 리스트</Typography>
              {listClick && check ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Box>
            {listClick && getTimeList()}
          </Box>
          {excelDown()}
        </>
      )}
    </Box>
  );
};
