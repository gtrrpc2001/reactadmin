import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  graphBpm,
  graphModal,
  writetimeButtonModal,
} from "../../../../../axios/interface/graphModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ButtonChartBpm } from "./ChartButton";
import {
  graphSliceShow,
  idCheck,
  replaceYear,
  selectTime,
} from "../../controller/modalController";
import { getWritetimeSelectHour_Min } from "../../../../../func/func";

type Props = {
  headerIconClick: graphModal;
  clickWritetimeButton: writetimeButtonModal;
  id: string;
};

export const BpmChart = ({
  headerIconClick,
  clickWritetimeButton,
  id,
}: Props) => {
  let [Count, setCount] = useState<number>(1);
  const [backBtn, setBackBtn] = useState<boolean>(true);
  const [nextBtn, setNextBtn] = useState<boolean>(false);
  const data: graphBpm[] = useSelector<RootState, any>(
    (state) => state.bpmGraphValue
  );

  const writetime: string = useSelector<RootState, any>(
    (state) => state.writetimeGraph
  );
  const [lineName1, setLineName1] = useState<string>("엊그제");
  const [lineName2, setLineName2] = useState<string>("어제");
  const [lineName3, setLineName3] = useState<string>("오늘");

  const length = data.length;
  const pageLength = Math.ceil(length / 1000);

  const [slice, setSlice] = useState<number[]>(graphSliceShow(Count, length));

  const [yHeight, setYHeight] = useState<number>(180);

  useEffect(() => {
    setYHeight(idCheck(id, true) ? 100 : 180);
  }, [id]);

  useEffect(() => {
    setCount(1);
  }, [headerIconClick]);

  let start = slice[0];
  let end = slice[1];

  const getValue = (prevValue: number, d: graphBpm, time: string) => {
    if (id == "bpm") {
      if (d.writetime.includes(time)) {
        return d.bpm > 180 ? 180 : d.bpm;
      }
    } else if (id == "hrv") {
      if (d.writetime.includes(time)) {
        return d.hrv > 180 ? 180 : d.hrv;
      }
    }
    return prevValue;
  };

  const onlyTodayDataGubun = (data: graphBpm) => {
    if (id == "bpm") {
      return data?.bpm;
    } else if (id == "hrv") {
      return data?.hrv;
    } else {
      return data?.stress;
    }
  };

  const getLineValue = (value: any, d: graphBpm) => {
    if (idCheck(id)) {
      let usageLast = 0;
      if (value > 180) usageLast = 180;
      else usageLast = value;
      return {
        usageLast: usageLast,
        xAxis: getWritetimeSelectHour_Min(d.writetime),
      };
    } else {
      let usageLast: { sns: number; pns: number } = { sns: 0, pns: 0 };
      if (value.sns > 100) {
        usageLast.sns = 100;
      } else {
        usageLast.sns = value.sns;
      }

      if (value.pns > 100) {
        usageLast.pns = 100;
      } else {
        usageLast.pns = value.pns;
      }
      return {
        sns: usageLast.sns,
        pns: usageLast.pns,
        xAxis: getWritetimeSelectHour_Min(d.writetime),
      };
    }
  };

  const defaultData = () => {
    try {
      return data?.slice(start, end)?.map((d) => {
        const value: any = onlyTodayDataGubun(d);
        return getLineValue(value, d);
      });
    } catch {
      return [];
    }
  };

  const getData = () => {
    if (idCheck(id, true)) {
      return defaultData();
    }
    switch (true) {
      case clickWritetimeButton.days2:
        const times: string[] = selectTime(writetime, 1);
        let first = 0;
        let second = 0;
        const v = data?.slice(start, end)?.map((d) => {
          first = getValue(first, d, times[0]);
          second = getValue(second, d, times[1]);

          return {
            usageLast1: first,
            usageLast2: second,
            xAxis: getWritetimeSelectHour_Min(d.writetime), //d.writetime?.split(' ')[1]
          };
        });
        return v;
      case clickWritetimeButton.days3:
        const time1: string[] = selectTime(writetime, 2);
        const time2: string[] = selectTime(writetime, 1);
        let _first = 0;
        let _second = 0;
        let third = 0;
        const v2 = data?.slice(start, end)?.map((d) => {
          _first = getValue(_first, d, time1[0]);
          _second = getValue(_second, d, time2[0]);
          third = getValue(third, d, time2[1]);
          return {
            usageLast3: _first,
            usageLast4: _second,
            usageLast5: third,
            xAxis: getWritetimeSelectHour_Min(d.writetime),
          };
        });
        return v2;
      default:
        return defaultData();
    }
  };

  const lineData = getData();

  function countHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    if (e.currentTarget.id == "plus") {
      if (pageLength != 1) {
        setCount(Count + 1);
        setBackBtn(false);
      }
      if (pageLength == Count + 1) {
        setNextBtn(true);
      }
    } else {
      if (Count > 1) {
        setCount(Count - 1);
        setNextBtn(false);
      }
      if (Count == 2) {
        setBackBtn(true);
      } else {
        setBackBtn(false);
      }
    }
  }

  useEffect(() => {
    setSlice(graphSliceShow(Count, length));
  }, [Count, clickWritetimeButton]);

  useEffect(() => {
    const setLineName = () => {
      if (idCheck(id)) {
        switch (true) {
          case clickWritetimeButton.days2:
            const times: string[] = selectTime(writetime, 1);
            const yesterTime = replaceYear(times[0]);
            const todayTime = replaceYear(times[1]);
            setLineName2(yesterTime);
            setLineName3(todayTime);
            break;
          case clickWritetimeButton.days3:
            const calDayAgo2 = selectTime(writetime, 2);
            const calDayAgo1 = selectTime(writetime, 1);
            const dayAgo2 = replaceYear(calDayAgo2[0]);
            const dayAgo1 = replaceYear(calDayAgo1[0]);
            const today = replaceYear(calDayAgo1[1]);
            setLineName1(dayAgo2);
            setLineName2(dayAgo1);
            setLineName3(today);
            break;
        }
      }
    };
    setNextBtn(false);
    setCount(1);
    setBackBtn(true);
    setLineName();
  }, [clickWritetimeButton, writetime]);

  const stressLine = () => {
    const lines = [
      { dataKey: "sns", stroke: "#ef507b", name: "SNS" },
      { dataKey: "pns", stroke: "#5388F7", name: "PNS" },
    ];

    const referenceLines = [
      { y: 40, stroke: "blue" },
      { y: 60, stroke: "blue" },
      { y: 20, stroke: "red" },
      { y: 80, stroke: "red" },
    ];

    return (
      <>
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            name={line.name}
            yAxisId="left"
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.stroke}
            dot={false}
          />
        ))}
        <Legend />
        {referenceLines.map((refLine) => (
          <ReferenceLine
            key={refLine.y}
            y={refLine.y}
            stroke={refLine.stroke}
            strokeDasharray="3 3"
            yAxisId="left"
          />
        ))}
      </>
    );
  };

  const calculateStandardDeviation = (data: number[]): number => {
    const n = data.length;
    if (n === 0) return 0;

    const mean = data.reduce((acc, val) => acc + val, 0) / n;
    const squaredDiffs = data.map((val) => {
      const diff = val - mean;
      return diff * diff;
    });

    const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / n;
    return Math.sqrt(variance);
  };

  const bpm_hrvLine = () => {
    const selectData =
      id == "bpm" ? data?.map((d) => d.bpm) : data?.map((d) => d.hrv);
    const aver = Math.floor(
      selectData?.reduce((total: number, next: number) => total + next, 0) /
        selectData.length
    );

    const stdDeviation = calculateStandardDeviation(selectData);

    const max = aver + stdDeviation;
    const min = aver - stdDeviation;

    const referenceLines = [
      { y: max, stroke: "red" },
      { y: aver, stroke: "pink" },
      { y: min, stroke: "blue" },
    ];

    const linesConfig = {
      days2: [
        { name: lineName2, dataKey: "usageLast1", stroke: "#8884d8" },
        { name: lineName3, dataKey: "usageLast2", stroke: "#ff7300" },
      ],
      days3: [
        { name: lineName1, dataKey: "usageLast3", stroke: "#8884d8" },
        { name: lineName2, dataKey: "usageLast4", stroke: "#ff7300" },
        { name: lineName3, dataKey: "usageLast5", stroke: "#7ac4c0" },
      ],
      default: [{ name: id, dataKey: "usageLast", stroke: "#8884d8" }],
    };

    const selectedLines = clickWritetimeButton.days2
      ? linesConfig.days2
      : clickWritetimeButton.days3
      ? linesConfig.days3
      : linesConfig.default;

    return (
      <>
        {selectedLines.map((line) => (
          <Line
            key={line.dataKey}
            name={line.name}
            yAxisId="left"
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.stroke}
            dot={false}
          />
        ))}
        <Legend />
        {referenceLines.map((refLine) => (
          <ReferenceLine
            key={refLine.y}
            y={refLine.y}
            stroke={refLine.stroke}
            strokeDasharray="3 3"
            yAxisId="left"
          />
        ))}
      </>
    );
  };

  const getLine = () => {
    if (idCheck(id, true)) {
      return stressLine();
    }

    return bpm_hrvLine();
  };

  return (
    <Box sx={{ width: 350, height: 350, marginTop: 2 }}>
      <LineChart data={lineData} width={335} height={300}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="xAxis" allowDataOverflow={true} domain={[0, 1000]} />
        <YAxis yAxisId="left" domain={[0, yHeight]} width={30} />
        <Tooltip active={true} />
        {getLine()}
      </LineChart>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <ButtonChartBpm
          id="minus"
          bgColor="#5388F7"
          disabled={backBtn}
          Handler={(e) => countHandler(e)}
          front={false}
        />
        <Typography
          sx={{
            marginLeft: 1,
            marginRight: 1,
            fontSize: 12,
            fontWeight: "bold",
            ":hover": { cursor: "default" },
          }}
        >
          이전,다음 {`${Count}/${Math.ceil(length / 1000)}`}
        </Typography>
        <ButtonChartBpm
          id="plus"
          bgColor="#5388F7"
          disabled={nextBtn}
          Handler={(e) => countHandler(e)}
          front={true}
        />
      </Box>
    </Box>
  );
};
