import { Box } from "@mui/material";
import { ModalTopBody } from "./topbody/modalTopbody";
import { MiddleBody } from "./middlebody/middleBody";
import { ModalRealTimeGraph } from "../../../../../page/graph/modalGraph";
import { BottomBody } from "../../component/bottomBody";
import {
  getDate,
  getDayjs,
  getDecimal,
  getHeartText,
} from "../../controller/modalController";
import { modalValues } from "../../../../../axios/interface/modalvalues";
import { profileModal } from "../../../../../axios/interface/profileModal";
import { useEffect, useState } from "react";
import { getOnlyArr } from "../../../../../axios/api/serverApi";
import { useDateMemo } from "../../../hooks/selectCheckboxHooks";

type Props = {
  open: boolean;
  modalList: modalValues;
  values: any;
  getProfile: profileModal;
};

export const ModalHome = ({ open, modalList, values, getProfile }: Props) => {
  const [todayArr, setTodayArr] = useState(getProfile.arrCnt);
  const [yesterArr, setYesterArr] = useState(0);
  const checkTime = useDateMemo(getDate(modalList.writetime));
  const getArr = async () => {
    const endDate = getDayjs(checkTime, 1, "YYYY-MM-DD", "day");
    const arrCount = await getOnlyArr(
      `mslecgarr/arrCount?eq=${values.eq}&startDate=${checkTime}&endDate=${endDate}`
    );
    setTodayArr(arrCount.arrCnt);
  };

  const getYesterdayArr = async () => {
    const yesterday = getDayjs(checkTime, -1, "YYYY-MM-DD", "day");
    const arrCount = await getOnlyArr(
      `mslecgarr/arrCount?eq=${values.eq}&startDate=${yesterday}&endDate=${checkTime}`
    );
    setYesterArr(arrCount.arrCnt);
  };

  useEffect(() => {
    getArr();
  }, [modalList.arrCnt, checkTime]);

  useEffect(() => {
    getYesterdayArr();
  }, [checkTime]);

  return (
    <>
      <ModalTopBody
        bpm={modalList.bpm}
        arrCnt={todayArr}
        prevArrCnt={yesterArr}
        HeartText={getHeartText(modalList.arrCnt)}
      />

      <MiddleBody
        bpm={modalList.bpm}
        arrCnt={todayArr}
        sleepTime={getProfile.sleeptime}
        upTime={getProfile.uptime}
        settingBpm={getProfile.bpm}
      />

      <Box>
        <ModalRealTimeGraph
          open_close={open}
          bpm={modalList.bpm}
          eq={values.eq}
          time={modalList.writetime}
          width={335}
          height={280}
          Ywidth={30}
        />
      </Box>

      <BottomBody
        actCal={modalList.actCal}
        step={modalList.step}
        temp={modalList.temp}
        distance={getDecimal(modalList.distance)}
      />
    </>
  );
};
