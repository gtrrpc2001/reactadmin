import Box from "@mui/material/Box";
import { getUserBpmType } from "../../../controller/modalController";
import { BpmTypeChildren } from "./bpmTypeChildren";

type Props = {
  bpm: number;
  sleepTime: number;
  upTime: number;
  settingBpm: number;
};

export const BpmType = ({ bpm, sleepTime, upTime, settingBpm }: Props) => {
  const bpmTypeList = getUserBpmType(bpm, sleepTime, upTime, settingBpm);
  const restbgColor = `${bpmTypeList.rest ? "#2d3f64" : ""}`;
  const restColor = `${bpmTypeList.rest ? "white" : ""}`;
  const activitybgColor = `${bpmTypeList.activity ? "#2d3f64" : ""}`;
  const activityColor = `${bpmTypeList.activity ? "white" : ""}`;
  const sleepbgColor = `${bpmTypeList.sleep ? "#2d3f64" : ""}`;
  const sleepColor = `${bpmTypeList.sleep ? "white" : ""}`;

  return (
    <Box
      sx={{
        display: "flex",
        width: "45%",
        height: 25,
        bgcolor: "#ecf0f3",
        borderRadius: 1,
        marginLeft: 0.5,
        ":hover": { cursor: "default" },
      }}
    >
      <BpmTypeChildren
        iconType={"rest"}
        children={"휴식"}
        bgColor={restbgColor}
        Color={restColor}
      />

      <BpmTypeChildren
        iconType={"activity"}
        children={"활동"}
        bgColor={activitybgColor}
        Color={activityColor}
      />

      <BpmTypeChildren
        iconType={"sleep"}
        children={"수면"}
        bgColor={sleepbgColor}
        Color={sleepColor}
      />
    </Box>
  );
};
