import { Box } from "@mui/material";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";
import {
  dayGubunButtonModal,
  graphModal,
} from "../../../../../axios/interface/graphModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import "./barChart.scss";
import { useEffect, useState } from "react";
import { getCalStep, getPulse } from "../../controller/modalController";

type Props = {
  dayGubunButtonModal: dayGubunButtonModal;
  iconSelect: graphModal;
};

export const BarCharts = ({ iconSelect, dayGubunButtonModal }: Props) => {
  const writetime: string = useSelector<RootState, any>(
    (state) => state.writetimeGraph
  );
  const data: any[] = useSelector<RootState, any>(
    (state) => state.barGraphValue
  );
  const [max, setMax] = useState<number>(100);

  const useGetData = () => {
    switch (true) {
      case iconSelect.pulse:
        return getPulse(writetime, data, dayGubunButtonModal);
      default:
        return getCalStep(writetime, data, iconSelect, dayGubunButtonModal);
    }
  };

  const cal_stepBar = (bool: boolean) => {
    return (
      <>
        <Bar
          name={bool ? "걸음수" : "총 칼로리 (kcal)"}
          yAxisId="left"
          type="monotone"
          dataKey="data1"
          fill="red"
          activeBar={<Rectangle fill="red" stroke="blue" />}
        />
        <Bar
          name={bool ? "거리 (m)" : "활동 칼로리 (kcal)"}
          yAxisId="left"
          type="monotone"
          dataKey="data2"
          fill="blue"
          activeBar={<Rectangle fill="blue" stroke="red" />}
        />
      </>
    );
  };

  const bar = () => {
    switch (true) {
      case iconSelect.cal:
        return cal_stepBar(false);
      case iconSelect.step:
        return cal_stepBar(true);
      default:
        return (
          <Bar
            name={"비정상맥박"}
            yAxisId="left"
            type="monotone"
            dataKey="data"
            fill="red"
            activeBar={<Rectangle fill="red" stroke="blue" />}
          />
        );
    }
  };

  const getYAxisDomain = () => {
    if (`${typeof data}` === "object") {
      let getMax: number = 0;
      switch (true) {
        case iconSelect.cal:
          const selectBigValueArr = data?.map((o) =>
            +o.cal > +o.calexe ? o.cal : o.calexe
          );
          getMax = Math.max(...selectBigValueArr);
          break;
        case iconSelect.step:
          getMax = Math.max(
            ...data?.map((o) =>
              +o.step > +o.distanceKM ? o.step : o.distanceKM
            )
          );
          break;
        default:
          getMax = Math.max(...data?.map((o) => o.count));
          break;
      }
      setMax(getMax);
    }
  };

  useEffect(() => {
    getYAxisDomain();
  }, [data]);

  let barData = useGetData();

  return (
    <Box sx={{ width: 350, height: 320, marginTop: 2 }}>
        <ComposedChart data={barData} width={335} height={300}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="xAxis" height={15} />
          <YAxis yAxisId="left" domain={[0, max]} width={40} />
          {bar()}
          <Legend
            formatter={(value, entry, index) => (
              <span className="text-color-class">{value}</span>
            )}
          />
          <Tooltip />
        </ComposedChart>
    </Box>
  );
};
