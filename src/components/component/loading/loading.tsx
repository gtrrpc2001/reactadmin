import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size="10rem" thickness={2} />
    </Box>
  );
};
