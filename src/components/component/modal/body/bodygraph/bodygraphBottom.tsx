import { Box, Typography, Divider } from "@mui/material";
import {
  dayGubunButtonModal,
  graphBpm,
  graphCalStep,
  graphPulse,
  writetimeButtonModal,
} from "../../../../../axios/interface/graphModal";
import { RootState } from "../../../../../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ProgressBar } from "./progressBar";
import { profileModal } from "../../../../../axios/interface/profileModal";
import { idCheck, progressBarValue } from "../../controller/modalController";

type Props = {
  clickWritetimeButton?: writetimeButtonModal;
  clickDayGubunButton?: dayGubunButtonModal;
  id?: string;
  profile?: profileModal;
  step?: boolean;
  setting?: number;
};

export const BodyGraphBpmBottom = ({ clickWritetimeButton, id }: Props) => {
  const writetime: string = useSelector<RootState, any>(
    (state) => state.writetimeGraph
  );
  const data: graphBpm[] = useSelector<RootState, any>(
    (state) => state.bpmGraphValue
  );
  const [max, setMax] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [aver, setAver] = useState<number>(0);
  const [minus, setMimus] = useState<number>(0);
  const [plus, setPlus] = useState<number>(0);

  const [maxSNS, setMaxSNS] = useState<number>(0);
  const [minSNS, setMinSNS] = useState<number>(0);
  const [avgSNS, setAvgSNS] = useState<number>(0);
  const [maxPNS, setMaxPNS] = useState<number>(0);
  const [minPNS, setMinPNS] = useState<number>(0);
  const [avgPNS, setAvgPNS] = useState<number>(0);

  const setTextValues = (max: number, min: number, aver: number) => {
    setMax(max);
    setMin(min);
    setAver(aver);
    setMimus(aver - min);
    setPlus(max - aver);
  };

  const setStressTextValues = (
    maxSNS: number,
    minSNS: number,
    avgSNS: number,
    maxPNS: number,
    minPNS: number,
    avgPNS: number
  ) => {
    setMaxSNS(maxSNS);
    setMinSNS(minSNS);
    setAvgSNS(avgSNS);
    setMaxPNS(maxPNS);
    setMinPNS(minPNS);
    setAvgPNS(avgPNS);
  };

  const getTextValues = (): any[] => {
    switch (id) {
      case "stress":
        return data?.map((d) => d.stress);
      case "hrv":
        return data?.map((d) => d.hrv);
      default:
        return data?.map((d) => d.bpm);
    }
  };

  const getText = () => {
    switch (id) {
      case "stress":
        return "스트레스";
      case "hrv":
        return "평균변동률";
      default:
        return "평균심박수";
    }
  };

  const getTextTech = () => {
    switch (id) {
      case "stress":
        return "stress";
      case "hrv":
        return "ms";
      default:
        return "BPM";
    }
  };

  const fixedToNumber = (num: number) => {
    return Number.isInteger(num) ? num : num.toFixed(2);
  };

  useEffect(() => {
    const getValue = () => {
      if (data?.length != 0 && !String(data).includes("result")) {
        if (id == "stress") {
          const value = getTextValues();
          if (!value[0]) {
            return;
          }
          const snsList = value.map((d: { pns: number; sns: number }) => d.sns);
          const pnsList = value.map((d: { pns: number; sns: number }) => d.pns);
          const maxSNS = Math.max(...snsList);
          const minSNS = Math.min(...snsList);
          const maxPNS = Math.max(...pnsList);
          const minPNS = Math.min(...pnsList);
          const avgSNS = Math.floor(
            value.reduce(
              (
                total: { pns: number; sns: number },
                next: { pns: number; sns: number }
              ) => {
                return {
                  pns: total.pns,
                  sns: total.sns + next.sns,
                };
              },
              { pns: 0, sns: 0 }
            ).sns / value.length
          );
          const avgPNS = Math.floor(
            value.reduce(
              (
                total: { pns: number; sns: number },
                next: { pns: number; sns: number }
              ) => {
                return {
                  pns: total.pns + next.pns,
                  sns: total.sns,
                };
              },
              { pns: 0, sns: 0 }
            ).pns / value.length
          );
          setStressTextValues(maxSNS, minSNS, avgSNS, maxPNS, minPNS, avgPNS);
        } else {
          const value = getTextValues();
          const max = Math?.max(...value);
          const min = Math?.min(...value);
          const aver = Math.floor(
            value?.reduce((total: number, next: number) => total + next, 0) /
              value.length
          );
          setTextValues(max, min, aver);
        }
      } else {
        setTextValues(0, 0, 0);
      }
    };
    getValue();
  }, [data, clickWritetimeButton, writetime]);

  const childrenBoxStyle = {
    position: "absolute",
    textAlign: "center",
  };

  const textPadding = {
    paddingBottom: 0.5,
  };

  const textWeight = {
    fontWeight: "bold",
  };

  const hover = { ":hover": { cursor: "default" } };

  return (
    <Box
      sx={{
        height: 120,
        display: "flex",
        justifyContent: "center",
        marginTop: idCheck(id) ? 1 : 3,
      }}
    >
      <Box sx={[childrenBoxStyle, { left: 40 }, hover]}>
        {idCheck(id, true) && (
          <Typography
            sx={{ color: "#ef507b", fontWeight: "bold", marginBottom: 1 }}
          >
            {"SNS"}
          </Typography>
        )}
        <Typography
          sx={[textPadding, idCheck(id, true) && { color: "#ef507b" }]}
        >
          {idCheck(id) ? "Min" : maxSNS.toFixed(1)}
        </Typography>

        <Typography sx={[textPadding, idCheck(id, true) && textWeight]}>
          {idCheck(id) ? fixedToNumber(min) : avgSNS.toFixed(1)}
        </Typography>
        <Typography sx={{ color: "#5388F7" }}>
          {idCheck(id) ? `-${fixedToNumber(minus)}` : minSNS.toFixed(1)}
        </Typography>
      </Box>
      <Box
        sx={[childrenBoxStyle, hover, idCheck(id, true) && { paddingTop: 2.8 }]}
      >
        <Typography
          sx={[
            textPadding,
            textWeight,
            idCheck(id, true) && {
              marginTop: 1,
              color: "#ef507b",
              paddingTop: 0.28,
            },
          ]}
        >
          {idCheck(id) ? getText() : "Max"}
        </Typography>
        <Typography sx={[textPadding, textWeight]}>
          {idCheck(id) ? aver : "Avg"}
        </Typography>
        <Typography
          sx={[textWeight, idCheck(id, true) && { color: "#5388F7" }]}
        >
          {idCheck(id) ? getTextTech() : "Min"}
        </Typography>
      </Box>
      <Box sx={[childrenBoxStyle, { right: 40 }, hover]}>
        {idCheck(id, true) && (
          <Typography
            sx={{ color: "#5388F7", fontWeight: "bold", marginBottom: 1 }}
          >
            {"PNS"}
          </Typography>
        )}
        <Typography
          sx={[textPadding, idCheck(id, true) && { color: "#ef507b" }]}
        >
          {idCheck(id) ? "Max" : maxSNS.toFixed(1)}
        </Typography>

        <Typography sx={[textPadding, idCheck(id, true) && textWeight]}>
          {idCheck(id) ? fixedToNumber(max) : avgPNS.toFixed(1)}
        </Typography>
        <Typography sx={{ color: idCheck(id) ? "#ef507b" : "#5388F7" }}>
          {idCheck(id) ? `+${fixedToNumber(plus)}` : minPNS.toFixed(1)}
        </Typography>
      </Box>
    </Box>
  );
};

export const BodyGraphPulseBottom = ({ clickDayGubunButton }: Props) => {
  const writetime: string = useSelector<RootState, any>(
    (state) => state.writetimeGraph
  );
  const data: graphPulse[] = useSelector<RootState, any>(
    (state) => state.barGraphValue
  );
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    try {
      if (data.length != 0 && !String(data).includes("result")) {
        const dataValueAdd = data.reduce(function add(sum, currValue) {
          return +currValue.count + +sum;
        }, 0);
        setCount(dataValueAdd);
      } else {
        setCount(0);
      }
    } catch {}
  }, [clickDayGubunButton, data, writetime]);

  return (
    <Box sx={{ display: "flex", height: 50, marginTop: 4 }}>
      <Box sx={{ textAlign: "center", position: "absolute", left: 40 }}>
        <Typography sx={{ fontWeight: "bold" }}>{"비정상맥박"}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>{"(times/Day)"}</Typography>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          position: "absolute",
          marginTop: 1.5,
          right: 80,
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>{count}</Typography>
      </Box>
    </Box>
  );
};

export const BodyGraphCalStepBottom = ({ setting, profile, step }: Props) => {
  const writetime: string = useSelector<RootState, any>(
    (state) => state.writetimeGraph
  );
  const data: graphCalStep[] = useSelector<RootState, any>(
    (state) => state.barGraphValue
  );
  const [values, setValues] = useState<number[]>([0, 0]);
  const [barValues, setBarValues] = useState<number[]>([0, 0]);

  const barWidth = 210;
  const textWidth = 124;

  const firstSettingNum =
    (step ? Number(profile?.step) : Number(profile?.cal)) * Number(setting);
  const secondSettingNum =
    (step ? Number(profile?.distanceKM) : Number(profile?.calexe)) *
    Number(setting);
  const firstSetting = step
    ? `${firstSettingNum} step`
    : `${firstSettingNum} kcal`;
  const secondSetting = step
    ? `${secondSettingNum} km`
    : `${secondSettingNum} kcal`;
  // console.log(`${profile?.distanceKM} -- ${profile?.calexe} -- ${setting}`);
  useEffect(() => {
    try {
      if (data.length != 0 && !String(data).includes("result")) {
        const firstValueAdd = data.reduce(function add(sum, currValue) {
          return step ? +currValue.step + +sum : +currValue.cal + +sum;
        }, 0);

        const secondValueAdd = data.reduce(function add(sum, currValue) {
          return step ? +currValue.distanceKM + +sum : +currValue.calexe + +sum;
        }, 0);
        setValues([firstValueAdd, secondValueAdd]);
      } else {
        setValues([0, 0]);
      }
    } catch {}
  }, [data, writetime]);

  useEffect(() => {
    setBarValues([
      progressBarValue(firstSettingNum, values[0]),
      step
        ? progressBarValue(secondSettingNum, values[1], true)
        : progressBarValue(secondSettingNum, values[1]),
    ]);
  }, values);

  return (
    <Box sx={{ height: 120, marginLeft: 1, marginTop: 2, marginRight: 1 }}>
      <Box sx={{ display: "flex" }}>
        <ProgressBar
          value={barValues[0]}
          barWidth={barWidth}
          color={"#ef507b"}
          text={step ? "걸음" : "총 칼로리"}
        />
        <Box sx={{ width: textWidth, textAlign: "center" }}>
          <Typography>
            {step ? `${values[0]} step` : `${values[0]} kcal`}
          </Typography>
          <Typography>{firstSetting}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: "flex" }}>
        <ProgressBar
          value={barValues[1]}
          barWidth={barWidth}
          color={"#5388F7"}
          text={step ? "걸음 거리" : "활동 칼로리"}
        />
        <Box sx={{ width: textWidth, textAlign: "center" }}>
          <Typography>
            {step ? `${values[1] / 1000} km` : `${values[1]} kcal`}
          </Typography>
          <Typography>{secondSetting}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
