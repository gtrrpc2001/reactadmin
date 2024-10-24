import { Box, SxProps, Theme, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenOutlinedIcon from "@mui/icons-material/HeartBrokenOutlined";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import stress_white from "../../../../../../assets/image/stress_white.png";
import stress from "../../../../../../assets/image/stress.png";

type Props = {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  boxID: string;
  boxSx: SxProps<Theme> | undefined;
  iconSx: SxProps<Theme> | undefined;
  fontSx: SxProps<Theme> | undefined;
  icons: string;
  text: string;
  stressCheck?: boolean;
};

export const IconBox = ({
  onClick,
  boxID,
  boxSx,
  iconSx,
  fontSx,
  icons,
  text,
  stressCheck = false,
}: Props) => {
  const getIconSelect = (icons: string) => {
    switch (icons) {
      case "bpm":
        return <FavoriteIcon sx={iconSx} fontSize="medium" />;
      case "pulse":
        return <HeartBrokenOutlinedIcon sx={iconSx} fontSize="medium" />;
      case "stress":
        return (
          <img
            src={stressCheck ? stress_white : stress}
            style={{ width: 25 }}
          />
        );
      case "hrv":
        return <MonitorHeartOutlinedIcon sx={iconSx} fontSize="medium" />;
      case "cal":
        return (
          <LocalFireDepartmentOutlinedIcon sx={iconSx} fontSize="medium" />
        );
      case "step":
        return <DirectionsRunIcon sx={iconSx} fontSize="medium" />;
    }
  };

  return (
    <Box id={boxID} onClick={(e) => onClick(e)} sx={boxSx}>
      {getIconSelect(icons)}
      <Typography sx={fontSx}>{text}</Typography>
    </Box>
  );
};
