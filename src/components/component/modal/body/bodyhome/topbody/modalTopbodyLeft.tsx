import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";

type Props = {
  bpm: number;
  width?: number;
  height?: number;
  fontSize?: number;
  borderRadius?: number;
  marginBlockStart?: number;
  top?: number;
  left?: number;
  heartSize?: "small" | "inherit" | "medium" | "large";
};

export const ModalTopBodyLeft = ({
  bpm,
  width = 150,
  height = 70,
  fontSize = 24,
  borderRadius = 5,
  marginBlockStart = 3,
  top = 63,
  left = 68,
  heartSize = "large",
}: Props) => {
  const bpmColor = "#5388F7";

  return (
    <Box sx={{ width: "50%" }}>
      <Box
        sx={{
          display: "inline-block",
          width: width,
          height: height,
          pb: 2,
          bgcolor: "white",
          border: 3,
          borderRadius: borderRadius,
          borderColor: bpmColor,
          verticalAlign: "middle",
          marginLeft: 1,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "-moz-initial",
            fontSize: fontSize,
            color: bpmColor,
            fontWeight: "bold",
            marginBlockStart: marginBlockStart,
            ":hover": { cursor: "default" },
          }}
          id="bpm"
          variant="h5"
          component="h5"
        >
          {bpm}
        </Typography>
      </Box>

      <Box sx={{ position: "absolute", top: top, left: left }}>
        <FavoriteIcon sx={{ color: bpmColor }} fontSize={heartSize} />
      </Box>
    </Box>
  );
};
