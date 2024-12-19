import { Box, Button, Typography } from "@mui/material";
import { dayGubunButtonModal } from "../../../../../axios/interface/graphModal";
import { useState } from "react";

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  dayClick: dayGubunButtonModal;
};

export const DayGubunButton = ({ onClick, dayClick }: Props) => {
  const [defaultColor] = useState("#bbb8b9");
  const [selectColor] = useState("#040a5c");

  const day = dayClick.day ? selectColor : defaultColor;
  const week = dayClick.week ? selectColor : defaultColor;
  const month = dayClick.month ? selectColor : defaultColor;
  const year = dayClick.year ? selectColor : defaultColor;

  const dayChildren = dayClick.day ? "white" : "#8b8a8a";
  const weekChildren = dayClick.week ? "white" : "#8b8a8a";
  const monthChildren = dayClick.month ? "white" : "#8b8a8a";
  const yearChildren = dayClick.year ? "white" : "#8b8a8a";

  return (
    <Box
      sx={{
        height: 30,
        display: "flex",
        alignItems: "center",
        marginBottom: 3,
      }}
    >
      <Button
        id="day"
        onClick={(e) => onClick(e)}
        sx={{
          marginLeft: 1,
          width: 80,
          height: 40,
          borderRadius: 3,
          bgcolor: day,
          ":hover": { bgcolor: day },
        }}
      >
        <Typography sx={{ color: dayChildren }}>{"Day"}</Typography>
      </Button>
      <Button
        id="week"
        onClick={(e) => onClick(e)}
        sx={{
          marginLeft: 1.5,
          width: 80,
          height: 40,
          borderRadius: 3,
          bgcolor: week,
          ":hover": { bgcolor: week },
        }}
      >
        <Typography sx={{ color: weekChildren }}>{"Week"}</Typography>
      </Button>
      <Button
        id="month"
        onClick={(e) => onClick(e)}
        sx={{
          marginLeft: 1.5,
          width: 80,
          height: 40,
          borderRadius: 3,
          bgcolor: month,
          ":hover": { bgcolor: month },
        }}
      >
        <Typography sx={{ color: monthChildren }}>{"Month"}</Typography>
      </Button>
      <Button
        id="year"
        onClick={(e) => onClick(e)}
        sx={{
          marginLeft: 1.5,
          marginRight: 1,
          width: 80,
          height: 40,
          borderRadius: 3,
          bgcolor: year,
          ":hover": { bgcolor: year },
        }}
      >
        <Typography sx={{ color: yearChildren }}>{"Year"}</Typography>
      </Button>
    </Box>
  );
};
