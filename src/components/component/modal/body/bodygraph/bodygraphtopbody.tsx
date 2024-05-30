import { Box } from "@mui/material";
import { graphModal } from "../../../../../axios/interface/graphModal";
import { useState } from "react";
import { IconBox } from "./icons/iconbox";

type Props = {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  graphIcon: graphModal;
};

export const BodyGraphTopBody = ({ onClick, graphIcon }: Props) => {
  const [defaultColor, setdefaultColor] = useState("transparent"); //#ef507b
  const [selectColor, setSelectColor] = useState("#040a5c");

  const bpm = graphIcon.bpm ? selectColor : defaultColor;
  const pulse = graphIcon.pulse ? selectColor : defaultColor;
  const hrv = graphIcon.hrv ? selectColor : defaultColor;
  const cal = graphIcon.cal ? selectColor : defaultColor;
  const step = graphIcon.step ? selectColor : defaultColor;

  const bpmChildren = graphIcon.bpm ? "white" : "#c3c1c1";
  const pulseChildren = graphIcon.pulse ? "white" : "#c3c1c1";
  const hrvChildren = graphIcon.hrv ? "white" : "#c3c1c1";
  const calChildren = graphIcon.cal ? "white" : "#c3c1c1";
  const stepChildren = graphIcon.step ? "white" : "#c3c1c1";

  const width = 55;
  const height = width;
  const border = 2;
  const borderColor = "#c3c1c1";
  const borderRadius = 5;
  const hover = { cursor: "pointer" };
  const marginLeft = 1.2;
  const buttonStyle = {
    width: width,
    height: height,
    border: border,
    borderColor: borderColor,
    borderRadius: borderRadius,
    ":hover": hover,
    display: "flex",
    justifyContent: "center",
  };

  const fontStyle = {
    fontSize: 12,
    fontWeight: "bold",
    position: "fixed",
    top: 103,
  };
  const iconStyle = { marginTop: 0.3 };

  return (
    <Box sx={{ height: 70, display: "flex" }}>
      <IconBox
        boxID={"bpm"}
        onClick={(e) => onClick(e)}
        boxSx={[buttonStyle, { marginLeft: 1, bgcolor: bpm }]}
        iconSx={[{ color: bpmChildren }, iconStyle]}
        fontSx={[fontStyle, { color: bpmChildren }]}
        icons={"bpm"}
        text={"심박"}
      />

      <IconBox
        boxID={"pulse"}
        onClick={(e) => onClick(e)}
        boxSx={[buttonStyle, { marginLeft: marginLeft, bgcolor: pulse }]}
        iconSx={[{ color: pulseChildren }, iconStyle]}
        fontSx={[fontStyle, { color: pulseChildren }]}
        icons={"pulse"}
        text={"비정상맥박"}
      />

      <IconBox
        boxID={"hrv"}
        onClick={(e) => onClick(e)}
        boxSx={[buttonStyle, { marginLeft: marginLeft, bgcolor: hrv }]}
        iconSx={[{ color: hrvChildren }, iconStyle]}
        fontSx={[fontStyle, { color: hrvChildren }]}
        icons={"hrv"}
        text={"맥박변동률"}
      />

      <IconBox
        boxID={"cal"}
        onClick={(e) => onClick(e)}
        boxSx={[buttonStyle, { marginLeft: marginLeft, bgcolor: cal }]}
        iconSx={[{ color: calChildren }, iconStyle]}
        fontSx={[fontStyle, { color: calChildren }]}
        icons={"cal"}
        text={"칼로리"}
      />

      <IconBox
        boxID={"step"}
        onClick={(e) => onClick(e)}
        boxSx={[buttonStyle, { marginLeft: marginLeft, bgcolor: step }]}
        iconSx={[{ color: stepChildren }, iconStyle]}
        fontSx={[fontStyle, { color: stepChildren }]}
        icons={"step"}
        text={"걸음"}
      />
    </Box>
  );
};
