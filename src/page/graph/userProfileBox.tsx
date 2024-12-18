import { Theme } from "@emotion/react";
import { Box, Divider, SxProps, Typography } from "@mui/material";

type props = {
  User: {
    eq: string;
    eqname: string;
    height: string;
    weight: string;
    age: string;
    birth: string;
    sleeptime: string;
    uptime: string;
    bpm: string;
    sex: string;
    step: string;
    distanceKM: string;
    cal: string;
    calexe: string;
  };
};

export const UserProfileBox = ({ User }: props) => {
  const labelSx: SxProps<Theme> = {
    fontSize: "0.85rem",
    color: "gray",
  };

  const valueSx: SxProps<Theme> = {
    fontSize: "0.9rem",
  };

  return (
    <Box>
      <Box
        paddingLeft={"15px"}
        paddingRight={"15px"}
        paddingTop={"10px"}
        paddingBottom={"10px"}
      >
        <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
          {User.eqname}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.85rem",
            color: "darkgray",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {User.eq}
        </Typography>
      </Box>
      <Divider />
      <Box
        paddingLeft={"15px"}
        paddingRight={"15px"}
        display={"flex"}
        paddingTop={"10px"}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        <Box>
          <Box>
            <Typography sx={{ ...labelSx }}>성별</Typography>
            <Typography sx={{ ...valueSx }}>{User.sex}</Typography>
          </Box>
          <Box paddingTop={"10px"}>
            <Typography sx={{ ...labelSx }}>목표 심박</Typography>
            <Typography sx={{ ...valueSx }}>{User.bpm} bpm</Typography>
          </Box>
        </Box>

        <Box>
          <Box>
            <Typography sx={{ ...labelSx }}>신장</Typography>
            <Typography sx={{ ...valueSx }}>{User.height} cm</Typography>
          </Box>
          <Box paddingTop={"10px"}>
            <Typography sx={{ ...labelSx }}>수면 시간</Typography>
            <Typography sx={{ ...valueSx }}>{User.sleeptime} 시</Typography>
          </Box>
        </Box>

        <Box>
          <Box>
            <Typography sx={{ ...labelSx }}>체중</Typography>
            <Typography sx={{ ...valueSx }}>{User.weight} Kg</Typography>
          </Box>
          <Box paddingTop={"10px"}>
            <Typography sx={{ ...labelSx }}>기상 시간</Typography>
            <Typography sx={{ ...valueSx }}>{User.uptime} 시</Typography>
          </Box>
        </Box>
      </Box>

      <Box display={"flex"} paddingTop={"10px"} justifyContent={"space-around"}>
        <Box display={"flex"} flexDirection={"column"}>
          <Box>
            <Typography sx={{ ...labelSx }}>목표 걸음</Typography>
            <Typography sx={{ ...valueSx }}>{User.step} 보</Typography>
          </Box>
          <Box paddingTop={"10px"}>
            <Typography sx={{ ...labelSx }}>활동 칼로리 </Typography>
            <Typography sx={{ ...valueSx }}>{User.calexe} kcal</Typography>
          </Box>
        </Box>

        <Box display={"flex"} flexDirection={"column"} paddingLeft={"10px"}>
          <Box>
            <Typography sx={{ ...labelSx }}>목표 거리</Typography>
            <Typography sx={{ ...valueSx }}>{User.distanceKM} Km</Typography>
          </Box>
          <Box paddingTop={"10px"}>
            <Typography sx={{ ...labelSx }}>소비 칼로리</Typography>
            <Typography sx={{ ...valueSx }}>{User.cal} kcal</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
