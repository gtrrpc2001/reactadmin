import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { graphKindButton } from "../../axios/interface/graph";
import { useEffect, useRef, useState } from "react";

type Props = {
  data: any[];
  width: number;
  height: number;
  kind: graphKindButton;
};

export const Graphs = ({ data, width, height, kind }: Props) => {
  const [graphWidth, setGraphWidth] = useState<number>(width);
  const [scroll, setScroll] = useState<boolean>(false);
  const [calMax, setCalMax] = useState<number>(180);
  const [Max, setMax] = useState<number>(180);
  const x = useRef<string>("");

  const getCalculWidth = (length: number, setNumber: number) => {
    const num = length / setNumber;
    const setWidth = width * num < width ? width : width * num;
    setGraphWidth(setWidth);
  };

  useEffect(() => {
    const getChangeWidth = () => {
      switch (true) {
        case kind.ecg:
          setMax(1000);
          getCalculWidth(data?.length, 2800);
          break;
        case kind.cal_step:
          const calM = Math.max(
            ...data?.map((o) => (o.cal > o.calexe ? o.cal : o.calexe))
          );
          const stepM = Math.max(
            ...data?.map((o) => (o.step > o.distanceKM ? o.step : o.distanceKM))
          );
          setCalMax(calM);
          setMax(stepM);
          getCalculWidth(1, 1);
          break;
        default:
          setMax(180);
          getCalculWidth(data?.length, 1500);
      }
    };
    getChangeWidth();
  }, [data]);

  useEffect(() => {
    if (graphWidth > width) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }, [graphWidth]);

  const changeGraph = () => {
    switch (true) {
      case kind.ecg:
        return (
          <>
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="ecg"
              stroke="#8884d8"
              dot={false}
              isAnimationActive={false}
            />
          </>
        );
      case kind.cal_step:
        return (
          <>
            <Bar name="걸음수" yAxisId="left" dataKey="step" fill="red" />
            <Bar
              name="걸음거리"
              yAxisId="left"
              dataKey="distanceKM"
              fill="blue"
            />
            <Bar name="칼로리" yAxisId="right" dataKey="cal" fill="#8884d8" />
            <Bar
              name="활동칼로리"
              yAxisId="right"
              dataKey="calexe"
              fill="#ef507b"
            />
            <YAxis yAxisId="right" orientation="right" domain={[0, calMax]} />
          </>
        );
      default:
        return (
          <>
            <Line
              name="맥박"
              yAxisId="left"
              type="monotone"
              dataKey="bpm"
              stroke="#ff7300"
              dot={false}
            />
            <Line
              name="맥박변동률"
              yAxisId="left"
              type="monotone"
              dataKey="hrv"
              stroke="#8884d8"
              dot={false}
            />
            <Bar
              name="비정상맥박발생지점"
              yAxisId="right"
              dataKey="arr"
              barSize={20}
              fill="#ef507b"
            />
            <YAxis yAxisId="right" domain={[0, 1]} orientation="right" />
          </>
        );
    }
  };

  const formatXAxis = (tickItem: string, index: number): string => {
    if (data.length != 0) {
      if (index == 0 || x.current != tickItem) {
        x.current = tickItem;
        return tickItem;
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        overflowX: scroll ? "scroll" : "hidden",
        overflowY: "hidden",
        width: width,
        height: height + 10,
      }}
    >
      <ResponsiveContainer width={'100%'} minWidth={graphWidth} height={height}>
        <ComposedChart data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="writetime"
            tickFormatter={kind.ecg ? formatXAxis : undefined}
          />
          <Tooltip />
          <Legend align="left" wrapperStyle={{ marginLeft: 50 }} />
          <YAxis yAxisId="left" domain={[0, Max]} />
          {changeGraph()}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
