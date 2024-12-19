import { Box, Typography } from "@mui/material";
import { useState } from "react";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import { footerIcon } from "../../../../axios/interface/footerIcon";
import HeartBrokenOutlinedIcon from "@mui/icons-material/HeartBrokenOutlined";

type Props = {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  footerClick: footerIcon;
};

export const Footer = ({ onClick, footerClick }: Props) => {
  const [defaultColor] = useState("#8b8a8a"); //#ef507b
  const [selectColor] = useState("#ef507b");
  const buttom = 15;
  const home = footerClick.home ? selectColor : defaultColor;
  const graph = footerClick.graph ? selectColor : defaultColor;
  const pulse = footerClick.pulse ? selectColor : defaultColor;
  const profile = footerClick.profile ? selectColor : defaultColor;

  const hover = { cursor: "pointer" };

  return (
    <Box
      sx={{
        width: 330,
        height: 70,
        display: "flex",
        bottom: 0,
        alignItems: "center",
        ":hover": { cursor: "default" },
      }}
    >
      <Box
        id="home"
        onClick={(e) => onClick(e)}
        sx={{ width: 50, marginLeft: 2, ":hover": hover }}
      >
        <HouseOutlinedIcon
          sx={{ color: home, marginLeft: 1 }}
          fontSize="large"
        />
        <Typography
          sx={{
            fontWeight: "bold",
            color: home,
            position: "absolute",
            bottom: buttom,
            left: 33,
          }}
        >
          {home == "#ef507b" ? "홈" : ""}
        </Typography>
      </Box>
      <Box
        id="graph"
        onClick={(e) => onClick(e)}
        sx={{ width: 90, marginLeft: 2, ":hover": hover }}
      >
        <InsertChartOutlinedIcon
          sx={{ color: graph, marginLeft: 3 }}
          fontSize="large"
        />
        <Typography
          sx={{
            fontWeight: "bold",
            color: graph,
            position: "absolute",
            bottom: buttom,
            left: 107,
          }}
        >
          {graph == "#ef507b" ? "요약" : ""}
        </Typography>
      </Box>
      <Box
        id="pulse"
        onClick={(e) => onClick(e)}
        sx={{ width: 90, ":hover": hover }}
      >
        <HeartBrokenOutlinedIcon
          sx={{ color: pulse, marginLeft: 3.5 }}
          fontSize="large"
        />
        <Typography
          sx={{
            fontWeight: "bold",
            color: pulse,
            position: "absolute",
            bottom: buttom,
            right: 90,
          }}
        >
          {pulse == "#ef507b" ? "비정상맥박" : ""}
        </Typography>
      </Box>
      <Box
        id="profile"
        onClick={(e) => onClick(e)}
        sx={{ width: 60, ":hover": hover }}
      >
        <AccountBoxOutlinedIcon
          sx={{ color: profile, marginLeft: 3 }}
          fontSize="large"
        />
        <Typography
          sx={{
            fontWeight: "bold",
            color: profile,
            position: "absolute",
            bottom: buttom,
            right: 22,
          }}
        >
          {profile == "#ef507b" ? "프로필" : ""}
        </Typography>
      </Box>
    </Box>
  );
};
