import { useEffect, useState } from "react";
// import { Box, CircularProgress } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
// import { GetEcg, GetEcgIdx, GetEcgTemp } from "../../data/graph";
import { GetEcgIdx, GetEcgTemp } from "../../data/graph";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type Porps = {
  open_close: boolean;
  bpm: number;
  eq: string;
  time: string;
  width: number;
  height: number;
  Ywidth: number;
};

export const ModalRealTimeGraph = ({ eq, width, height, Ywidth }: Porps) => {
  // const [open, setOpen] = useState<boolean>(false);
  const [dataArr, setDataArr] = useState<{ ecg: number }[]>(
    new Array(700).fill({ ecg: 500 })
  );
  const [startIdx, setStartIdx] = useState<number>(0);
  const url = useSelector<RootState, string>((state) => state.comboBoxSelected);

  const getEcgTempData = async () => {
    try {
      if (startIdx != 0) {
        const rows = await GetEcgTemp(eq, startIdx, url);
        let newDataArr = [...dataArr];
        if (rows.length != 0) {
          setStartIdx(rows[rows.length - 1].idx);
          rows.map((row) => {
            const ecgList = row.ecgpacket.map((d) => ({ ecg: d }));
            newDataArr = [...newDataArr, ...ecgList];
          });

          setDataArr(newDataArr.slice(-700));
        }
      }
    } catch (E) {
      console.log(E);
    }
  };

  useEffect(() => {
    const getEcgIdx = async (eq: string, url: string) => {
      const result = await GetEcgIdx(eq, url);
      setStartIdx(result);
    };

    const handleVisibilityChange = async () => {
      if (!document.hidden) {
        await getEcgIdx(eq, url);
      }
    };

    const intervalFunc = setInterval(() => {
      getEcgTempData();
    }, 300);

    getEcgIdx(eq, url);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalFunc);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [startIdx]);

  return (
    <>
      <LineChart data={dataArr} width={width} height={height}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          dataKey="xAxis"
          allowDataOverflow={true}
          domain={[0, 700]}
          width={0}
          height={0}
        />
        <YAxis yAxisId="left" domain={[0, 1000]} width={Ywidth} />
        <Tooltip />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="ecg"
          stroke="#8884d8"
          dot={false}
          animationDuration={0}
        />
      </LineChart>
    </>
  );
};
