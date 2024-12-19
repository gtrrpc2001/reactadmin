import { useEffect, useState } from "react";
import { getEcg } from "../../axios/api/serverApi";
import { Box, CircularProgress } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type Porps = {
  open_close: boolean;
  bpm: number;
  eq: string;
  time: string;
  width: number;
  height: number;
  Ywidth: number;
};

export const ModalRealTimeGraph = ({
  open_close,
  eq,
  time,
  width,
  height,
  Ywidth,
}: Porps) => {
  const [open, setOpen] = useState<boolean>(true);
  // let [dataArr] = useState<{ ecg: number }[]>([]);
  const [dataArr, setDataArr] = useState<{ ecg: number }[]>([]);

  const EcgData = async (result: number[]) => {
    // console.log(dataArr.length , result.length)
    if (open && dataArr?.length < 500) {
      let newData: { ecg: number }[] = [];
      if (result.length > 1000) {
        newData = result.slice(0, 999).map((d) => ({ ecg: d }));
      } else {
        newData = result.map((d) => ({ ecg: d }));
      }
      setDataArr((dataArr) => [...dataArr, ...newData]);
      if (dataArr?.length >= 420) {
        setOpen(false);
      }
    } else {
      for (const d of result) {
        dataArr.shift();
        dataArr.push({ ecg: d });
      }
    }
  };

  const getEcgData = async () => {
    try {
      const result = await getEcg(`/mslecgbyte/Ecg?eq=${eq}&startDate=${time}`);
      if (result) {
        if (result?.length != 1 && result?.length < 500) {
          await EcgData(result);
        }
      }
    } catch (E) {
      console.log(E);
    }
  };

  useEffect(() => {
    if (open_close) {
      getEcgData();
    } else {
      setDataArr([]);
    }
  }, [time]);

  return (
    <>
      {open == false ? (
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
          <Tooltip active={true} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="ecg"
            stroke="#8884d8"
            dot={false}
          />
        </LineChart>
      ) : (
        <Box
          sx={{
            width: 335,
            height: 280,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
    </>
  );
};
