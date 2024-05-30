import Box from "@mui/material/Box";
import { ModalTopBodyLeft } from "./modalTopbodyLeft";
import { ModalTopBodyRight } from "./modalTopbodyRight";

type Props = {
  bpm: number;
  arrCnt: number;
  prevArrCnt: number;
  HeartText: string;
};

export const ModalTopBody = ({ bpm, arrCnt, prevArrCnt, HeartText }: Props) => {
  const topBodyStyle = {
    display: "flex",
    height: "17%",
    alignItems: "center",
    width: "100%",
  };

  return (
    <Box sx={topBodyStyle}>
      <Box sx={{ display: "flex" }}>
        <ModalTopBodyLeft bpm={bpm} />

        <ModalTopBodyRight
          ArrCnt={arrCnt}
          prevArrCnt={prevArrCnt}
          HeartText={HeartText}
        />
      </Box>
    </Box>
  );
};
