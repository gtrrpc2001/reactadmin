import { graphKindButton } from "../../axios/interface/graph";
import { useCallback, useRef } from "react";
import ReactECharts from "echarts-for-react";
import {
  EcgGraphOption,
  HrvGraphOption,
  LivingGraphOption,
  StressGraphOption,
} from "./graphOption";
import { Box } from "@mui/material";

type Props = {
  data: any[];
  id: string;
  writetime: string;
  kind: graphKindButton;
  kindButtonHandler: (id: string) => void;
  downloadHRV: () => void;
  downloadStress: () => void;
  downloadECG: () => void;
};

export const Graphs = ({
  data,
  kind,
  id,
  writetime,
  kindButtonHandler,
  downloadHRV,
  downloadStress,
  downloadECG,
}: Props) => {
  const x = useRef<string>("");

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

  const getGraphOption = useCallback(() => {
    if (kind.ecg) {
      return EcgGraphOption(
        kind,
        data,
        id && writetime ? true : false,
        formatXAxis,
        kindButtonHandler,
        downloadECG
      );
    } else if (kind.cal_step) {
      return LivingGraphOption(
        kind,
        data,
        id && writetime ? true : false,
        formatXAxis,
        kindButtonHandler,
        downloadECG
      );
    } else if (kind.stress) {
      return StressGraphOption(
        kind,
        data,
        id && writetime ? true : false,
        formatXAxis,
        kindButtonHandler,
        downloadStress
      );
    } else {
      return HrvGraphOption(
        kind,
        data,
        id && writetime ? true : false,
        formatXAxis,
        kindButtonHandler,
        downloadHRV
      );
    }
  }, [kind, data, formatXAxis, kindButtonHandler]);

  return (
    <Box>
      <ReactECharts
        notMerge={true}
        lazyUpdate={true}
        option={getGraphOption()}
      />
    </Box>
  );
};
