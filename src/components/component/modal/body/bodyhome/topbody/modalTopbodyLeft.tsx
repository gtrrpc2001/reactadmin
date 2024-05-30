import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";

type Props = {
  bpm: number;
};

export const ModalTopBodyLeft = ({ bpm }: Props) => {
  const bpmColor = "#5388F7";

  return (
    <Box sx={{ width: "50%" }}>
      <Box
        sx={{
          display: "inline-block",
          width: 150,
          height: 70,
          pb: 2,
          bgcolor: "white",
          border: 3,
          borderRadius: 5,
          borderColor: bpmColor,
          verticalAlign: "middle",
          marginLeft: 1,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "-moz-initial",
            fontSize: 24,
            color: bpmColor,
            fontWeight: "bold",
            marginBlockStart: 3,
            ":hover": { cursor: "default" },
          }}
          id="bpm"
          variant="h5"
          component="h5"
        >
          {bpm}
        </Typography>
      </Box>

      <Box sx={{ position: "absolute", top: 63, left: 68 }}>
        <FavoriteIcon sx={{ color: bpmColor }} fontSize="large" />
      </Box>
    </Box>
  );
};
