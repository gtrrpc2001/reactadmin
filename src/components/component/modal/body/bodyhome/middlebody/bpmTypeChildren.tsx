import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CoffeeOutlinedIcon from "@mui/icons-material/CoffeeOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";

type Props = {
  iconType: string;
  children: string;
  bgColor: string;
  Color: string;
};

export const BpmTypeChildren = ({
  iconType,
  children,
  bgColor,
  Color,
}: Props) => {
  const GetIcon = () => {
    switch (iconType) {
      case "activity":
        return <FitnessCenterOutlinedIcon sx={{ color: Color }} />;
      case "sleep":
        return <BedtimeOutlinedIcon sx={{ color: Color }} />;
      default:
        return <CoffeeOutlinedIcon sx={{ color: Color }} />;
    }

    return;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: bgColor,
        width: 51,
        borderRadius: 1,
      }}
    >
      {GetIcon()}
      <Typography sx={{ fontSize: 13, fontWeight: "bold", color: Color }}>
        {children}
      </Typography>
    </Box>
  );
};
