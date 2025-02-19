import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { GetEcg, GetEcgIdx, GetEcgTemp } from "../../data/graph";
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

export const ModalRealTimeGraph = ({
  open_close,
  eq,
  time,
  width,
  height,
  Ywidth,
}: Porps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [dataArr, setDataArr] = useState<{ ecg: number }[]>([]);
  const [startIdx, setStartIdx] = useState<number>(0);

  const url = useSelector<RootState, string>((state) => state.comboBoxSelected);
  const EcgData = async (result: number[]) => {
    const newData = result.map((data) => ({ ecg: data }));
    setDataArr([...dataArr, ...newData].slice(-700));
  };

  const getEcgData = async () => {
    try {
      const result = await GetEcg(eq, time, url);
      if (result) {
        if (result?.length != 1 && result?.length < 500) {
          await EcgData(result);
        }
      }
    } catch (E) {
      console.log(E);
    }
  };

  const getEcgTempData = async () => {
    try {
      const rows = await GetEcgTemp(eq, startIdx, url);
      let newDataArr = [...dataArr];
      if (rows) {
        setStartIdx(rows[rows.length - 1].idx);
        rows.map((row) => {
          const ecgList = row.ecgpacket.map((d) => ({ ecg: d }));
          newDataArr = [...newDataArr, ...ecgList];
        });

        setDataArr(newDataArr.slice(-700));
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

    getEcgIdx(eq, url);
  }, []);

  useEffect(() => {
    if (open_close) {
      if (startIdx) {
        getEcgTempData();
      }
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
