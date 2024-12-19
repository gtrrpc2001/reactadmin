import { Button } from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

type Props = {
  id: string;
  bgColor: string;
  disabled?: boolean;
  Handler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  front: boolean;
};

export const ButtonChartBpm = ({
  id,
  bgColor,
  disabled,
  Handler,
  front,
}: Props) => {
  return (
    <Button
      id={id}
      sx={{
        bgcolor: bgColor,
        borderRadius: 15,
        ":hover": {
          cursor: disabled ? "default" : "pointer",
          bgcolor: "#5388F7",
        },
      }}
      disabled={disabled}
      onClick={(e) => Handler(e)}
    >
      {front ? (
        <ArrowForwardOutlinedIcon sx={{ color: "white" }} fontSize="small" />
      ) : (
        <ArrowBackOutlinedIcon sx={{ color: "white" }} fontSize="small" />
      )}
    </Button>
  );
};
