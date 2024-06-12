import { Box } from "@mui/material";
import { TypoLeftText, TypoRightText } from "./typography";
import { checkNull } from "../controller/modalController";

type Props = {
  actCal?: number;
  step?: number;
  temp?: number;
  distance?: number;
};
const borderColor = "#c3c1c1";
const First = { bottom1: 260, bottom2: 230 };
const left = { left1: 30, left2: 70 };
const right = { right1: 35, right2: 92, right3: 77 };
const second = { bottom1: First.bottom1 - 100, bottom2: First.bottom2 - 100 };
export const FirstLineTextBox = ({ actCal, step }: Props) => {
  const getActCal = checkNull(actCal);
  const getStep = checkNull(step);

  return (
    <Box sx={{ height: 100, display: "flex" }}>
      <Box
        sx={{
          marginLeft: 1,
          borderRadius: 5,
          border: 3,
          borderColor: borderColor,
          width: 150,
          height: 80,
          display: "flex",
        }}
      >
        <TypoLeftText
          bottom={First.bottom1}
          left={left.left1}
          value="활동 칼로리"
        />
        <TypoLeftText
          bottom={First.bottom2}
          left={left.left2}
          value={`${getActCal} kcal`}
        />
      </Box>
      <Box
        sx={{
          marginLeft: 2.5,
          borderRadius: 5,
          border: 3,
          borderColor: borderColor,
          width: 150,
          height: 80,
          display: "flex",
        }}
      >
        <TypoRightText
          bottom={First.bottom1}
          right={right.right2}
          value="걸음수"
        />
        <TypoRightText
          bottom={First.bottom2}
          right={right.right1}
          value={`${getStep} step`}
        />
      </Box>
    </Box>
  );
};

export const SecondLineTextBox = ({ temp, distance }: Props) => {
  return (
    <Box sx={{ height: 100, display: "flex" }}>
      <Box
        sx={{
          marginLeft: 1,
          borderRadius: 5,
          border: 3,
          borderColor: borderColor,
          width: 150,
          height: 80,
          display: "flex",
        }}
      >
        <TypoLeftText
          bottom={second.bottom1}
          left={left.left1}
          value="전극온도"
        />
        <TypoLeftText
          bottom={second.bottom2}
          left={left.left2}
          value={`${temp} °C`}
        />
      </Box>
      <Box
        sx={{
          marginLeft: 2.5,
          borderRadius: 5,
          border: 3,
          borderColor: borderColor,
          width: 150,
          height: 80,
          display: "flex",
        }}
      >
        <TypoRightText
          bottom={second.bottom1}
          right={right.right3}
          value="걸음거리"
        />
        <TypoRightText
          bottom={second.bottom2}
          right={right.right1}
          value={`${distance} km`}
        />
      </Box>
    </Box>
  );
};
