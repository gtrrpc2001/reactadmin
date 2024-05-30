import { ArrCntText } from "./arrCntText";
import { BpmType } from "./bpmType";
import Box from "@mui/material/Box";

type Props = {
  bpm: number;
  arrCnt: number;
  sleepTime: number;
  upTime: number;
  settingBpm: number;
};

export const MiddleBody = ({
  bpm,
  arrCnt,
  sleepTime,
  upTime,
  settingBpm,
}: Props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <BpmType
        bpm={bpm}
        sleepTime={sleepTime}
        upTime={upTime}
        settingBpm={settingBpm}
      />

      <ArrCntText arrCnt={arrCnt} />
    </Box>
  );
};
