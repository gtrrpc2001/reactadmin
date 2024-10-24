import { Box, colors } from "@mui/material";
import { graphModal } from "../../../../../axios/interface/graphModal";
import { useRef, useState } from "react";
import { IconBox } from "./icons/iconbox";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type Props = {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  graphIcon: graphModal;
};

export const BodyGraphTopBody = ({ onClick, graphIcon }: Props) => {
  const [defaultColor, setdefaultColor] = useState("transparent"); //#ef507b
  const [selectColor, setSelectColor] = useState("#040a5c");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const iconsConfig = [
    {
      id: "bpm",
      text: "심박",
      color: graphIcon.bpm ? selectColor : defaultColor,
      childrenColor: graphIcon.bpm ? "white" : "#c3c1c1",
    },
    {
      id: "pulse",
      text: "비정상맥박",
      color: graphIcon.pulse ? selectColor : defaultColor,
      childrenColor: graphIcon.pulse ? "white" : "#c3c1c1",
    },
    {
      id: "stress",
      text: "스트레스",
      color: graphIcon.stress ? selectColor : defaultColor,
      childrenColor: graphIcon.stress ? "white" : "#c3c1c1",
    },
    {
      id: "hrv",
      text: "맥박변동률",
      color: graphIcon.hrv ? selectColor : defaultColor,
      childrenColor: graphIcon.hrv ? "white" : "#c3c1c1",
    },
    {
      id: "cal",
      text: "칼로리",
      color: graphIcon.cal ? selectColor : defaultColor,
      childrenColor: graphIcon.cal ? "white" : "#c3c1c1",
    },
    {
      id: "step",
      text: "걸음",
      color: graphIcon.step ? selectColor : defaultColor,
      childrenColor: graphIcon.step ? "white" : "#c3c1c1",
    },
  ];

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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const fontStyle = {
    fontSize: 12,
    fontWeight: "bold",
  };
  const iconStyle = { marginTop: 0.3 };

  const ArrowStyle = {
    marginBottom: 1.5,
    borderRadius: 2,
    height: 60,
    ":hover": {
      bgcolor: colors.grey[300],
    },
  };
  return (
    <div style={{ display: "flex", height: 70, alignItems: "center" }}>
      <KeyboardArrowLeftIcon onClick={scrollLeft} sx={ArrowStyle} />
      <Box
        ref={scrollRef}
        sx={{
          height: 70,
          display: "flex",
          overflowX: "hidden",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          width: "500px",
        }}
      >
        {iconsConfig.map(({ id, text, color, childrenColor }) => (
          <div key={id}>
            <IconBox
              boxID={id}
              onClick={(e) => onClick(e)}
              boxSx={[
                buttonStyle,
                { marginLeft: id === "bpm" ? 0 : marginLeft, bgcolor: color },
              ]}
              iconSx={[{ color: childrenColor }, iconStyle]}
              fontSx={[fontStyle, { color: childrenColor }]}
              icons={id}
              text={text}
              stressCheck={
                id === "stress" ? (color == selectColor ? true : false) : false
              }
            />
          </div>
        ))}
      </Box>
      <ChevronRightIcon onClick={scrollRight} sx={ArrowStyle} />
    </div>
  );
};
