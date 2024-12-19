import { Box } from "@mui/material";
import {
  getClickDayGubunButton,
  getClickGraph,
  getClickWriteimteButton,
  idCheck,
} from "../../controller/modalController";
import {
  graphModal,
  writetimeButtonModal,
  dayGubunButtonModal,
} from "../../../../../axios/interface/graphModal";
import { useEffect, useState } from "react";
import { BodyGraphTopBody } from "./bodygraphtopbody";
import { BpmChart } from "./bpmChart";
import { Writetime } from "../../component/writetime";
import { WritetimeButton } from "./writetimeButton";
import {
  BodyGraphBpmBottom,
  BodyGraphCalStepBottom,
  BodyGraphPulseBottom,
} from "./bodygraphBottom";
import { BarCharts } from "./barChart";
import { DayGubunButton } from "./dayGubunButton";
import { profileModal } from "../../../../../axios/interface/profileModal";

type Props = {
  profile: profileModal;
  eq: string;
  startTime: string;
};

export const BodyGraph = ({ profile, eq, startTime }: Props) => {
  const [clickGraph, setClickGraph] = useState<graphModal>({
    bpm: true,
    pulse: false,
    stress: false,
    hrv: false,
    cal: false,
    step: false,
  });
  const [clickWritetimeButton, setClickWritetimeButton] =
    useState<writetimeButtonModal>({ today: true, days2: false, days3: false });
  const [clickDayGubunButton, setClickDayGubunButton] =
    useState<dayGubunButtonModal>({
      day: true,
      week: false,
      month: false,
      year: false,
    });
  const [gubunSettingNum, setSetting] = useState<number>(1);

  const iconClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id = e?.currentTarget?.id;
    let iconClick: graphModal = getClickGraph(id);
    setClickGraph(iconClick);
  };

  const writetimeButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const id = e?.currentTarget?.id;
    let iconClick: writetimeButtonModal = getClickWriteimteButton(id);
    setClickWritetimeButton(iconClick);
  };

  const dayGubunButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const id = e?.currentTarget?.id;
    let iconClick: dayGubunButtonModal = getClickDayGubunButton(id);
    setClickDayGubunButton(iconClick);
  };

  const getSettingCal_StepPlusValue = () => {
    let value = 1;
    switch (true) {
      case clickDayGubunButton.week:
        value = 7;
        break;
      case clickDayGubunButton.month:
        value = 30;
        break;
      case clickDayGubunButton.year:
        value = 365;
        break;
      default:
        break;
    }
    setSetting(value);
  };

  useEffect(() => {
    getSettingCal_StepPlusValue();
  }, [clickDayGubunButton]);

  const pulse_cal_step = () => {
    return (
      <>
        <BarCharts
          iconSelect={clickGraph}
          dayGubunButtonModal={clickDayGubunButton}
        />
        <DayGubunButton
          onClick={(e) => dayGubunButtonHandler(e)}
          dayClick={clickDayGubunButton}
        />
      </>
    );
  };

  const bpm_hrv_stress = (id: string) => {
    return (
      <>
        <BpmChart
          headerIconClick={clickGraph}
          clickWritetimeButton={clickWritetimeButton}
          id={id}
        />
        {idCheck(id) && (
          <WritetimeButton
            onClick={(e) => writetimeButtonHandler(e)}
            clickWritetimeButton={clickWritetimeButton}
          />
        )}
      </>
    );
  };

  const getGraphBodyUI = (iconSelect: graphModal) => {
    switch (true) {
      case iconSelect.pulse:
        return pulse_cal_step();
      case iconSelect.stress:
        return bpm_hrv_stress("stress");
      case iconSelect.hrv:
        return bpm_hrv_stress("hrv");
      case iconSelect.cal:
        return pulse_cal_step();
      case iconSelect.step:
        return pulse_cal_step();
      default:
        return bpm_hrv_stress("bpm");
    }
  };

  const getGraphBottomUI = (iconSelect: graphModal) => {
    switch (true) {
      case iconSelect.pulse:
        return (
          <BodyGraphPulseBottom clickDayGubunButton={clickDayGubunButton} />
        );
      case iconSelect.stress:
        return (
          <BodyGraphBpmBottom
            clickWritetimeButton={clickWritetimeButton}
            id={"stress"}
          />
        );
      case iconSelect.hrv:
        return (
          <BodyGraphBpmBottom
            clickWritetimeButton={clickWritetimeButton}
            id={"hrv"}
          />
        );

      case iconSelect.cal:
        return (
          <BodyGraphCalStepBottom
            profile={profile}
            step={false}
            setting={gubunSettingNum}
          />
        );
      case iconSelect.step:
        return (
          <BodyGraphCalStepBottom
            profile={profile}
            step={true}
            setting={gubunSettingNum}
          />
        );
      default:
        return (
          <BodyGraphBpmBottom
            clickWritetimeButton={clickWritetimeButton}
            id={"bpm"}
          />
        );
    }
  };

  return (
    <Box sx={{ height: 625, marginTop: 2 }}>
      <BodyGraphTopBody
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          iconClick(e)
        }
        graphIcon={clickGraph}
      />
      {getGraphBodyUI(clickGraph)}
      <Writetime
        iconSelect={clickGraph}
        clickWritetimeButton={clickWritetimeButton}
        clickDayGubunButton={clickDayGubunButton}
        eq={eq}
        startTime={startTime}
      />
      {getGraphBottomUI(clickGraph)}
    </Box>
  );
};
