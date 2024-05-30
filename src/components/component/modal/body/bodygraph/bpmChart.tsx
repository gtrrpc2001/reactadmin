import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  graphBpm,
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
} from "recharts";
import { ButtonChartBpm } from "./ChartButton";
import {
  graphSliceShow,
  replaceYear,
  selectTime,
} from "../../controller/modalController";
import { getWritetimeSelectHour_Min } from "../../../../../func/func";

type Props = {
  clickWritetimeButton: writetimeButtonModal;
  bpm: boolean;
};

export const BpmChart = ({ clickWritetimeButton, bpm }: Props) => {
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

  let start = slice[0];
  let end = slice[1];

  const getValue = (prevValue: number, d: graphBpm, time: string): number => {
    if (bpm) {
      if (d.writetime.includes(time)) {
        return d.bpm > 180 ? 180 : d.bpm;
      }
    } else {
      if (d.writetime.includes(time)) {
        return d.hrv > 180 ? 180 : d.hrv;
      }
    }
    return prevValue;
  };

  const onlyTodayDataGubun = (data: graphBpm) => {
    if (bpm) {
      return data?.bpm;
    } else {
      return data?.hrv;
    }
  };

  const getData = () => {
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
        try {
          return data?.slice(start, end)?.map((d) => {
            const value = onlyTodayDataGubun(d);
            return {
              usageLast: value > 180 ? 180 : value,
              xAxis: getWritetimeSelectHour_Min(d.writetime),
            };
          });
        } catch {
          return [];
        }
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
    };
    setNextBtn(false);
    setCount(1);
    setBackBtn(true);
    setLineName();
  }, [clickWritetimeButton, writetime]);

  const getLine = () => {
    switch (true) {
      case clickWritetimeButton.days2:
        return (
          <>
            <Line
              name={lineName2}
              yAxisId="left"
              type="monotone"
              dataKey="usageLast1"
              stroke="#8884d8"
              dot={false}
            />
            <Legend />
            <Line
              name={lineName3}
              yAxisId="left"
              type="monotone"
              dataKey="usageLast2"
              stroke="#ff7300"
              dot={false}
            />
            <Legend />
          </>
        );
      case clickWritetimeButton.days3:
        return (
          <>
            <Line
              name={lineName1}
              yAxisId="left"
              type="monotone"
              dataKey="usageLast3"
              stroke="#8884d8"
              dot={false}
            />
            <Legend />
            <Line
              name={lineName2}
              yAxisId="left"
              type="monotone"
              dataKey="usageLast4"
              stroke="#ff7300"
              dot={false}
            />
            <Legend />
            <Line
              name={lineName3}
              yAxisId="left"
              type="monotone"
              dataKey="usageLast5"
              stroke="#7ac4c0"
              dot={false}
            />
            <Legend />
          </>
        );
      default:
        return (
          <>
            <Line
              name={bpm ? "bpm" : "hrv"}
              yAxisId="left"
              type="monotone"
              dataKey="usageLast"
              stroke="#8884d8"
              dot={false}
            />
            <Legend />
          </>
        );
    }
  };

  return (
    <Box sx={{ width: 350, height: 350, marginTop: 2 }}>
        <LineChart data={lineData} width={335} height={300}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="xAxis" allowDataOverflow={true} domain={[0, 1000]} />
          <YAxis yAxisId="left" domain={[0, 180]} width={30} />
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
