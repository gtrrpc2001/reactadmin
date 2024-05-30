import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getArrEcgList } from "../../data/data";
import { getPulseEcgDataConverter } from "../../controller/modalController";

type Props = {
  eq: string;
  time: string;
};

export const PulseChart = ({ eq, time }: Props) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getArrEcgList(eq, time);
        let dataList: any[] = getPulseEcgDataConverter(result);
        setData(dataList);
      } catch {}
    };
    getData();
  }, [time]);

  return (
    <Box sx={{ height: 310, marginTop: 2 }}>
      <LineChart width={330} height={310} data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          dataKey="xAxis"
          allowDataOverflow={true}
          domain={[0, 600]}
          width={0}
          height={0}
        />
        <YAxis yAxisId="left" domain={[0, 1000]} width={30} />
        <Tooltip active={true} />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="ecg"
          stroke="#8884d8"
          dot={false}
        />
      </LineChart>
    </Box>
  );
};
