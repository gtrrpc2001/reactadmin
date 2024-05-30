import { Box, SxProps, Theme, Typography } from "@mui/material";

type Props = {
  sx?: SxProps<Theme> | undefined;
  children: string;
  valueWidth?: number;
  value: string | number;
  fontSize?: number;
};

export const TextBox = ({ sx, children, valueWidth, value }: Props) => {
  return (
    <Box sx={sx}>
      <Typography sx={{ color: "#999899" }}>{children}</Typography>
      <Box
        sx={{
          border: 1,
          borderRadius: 3,
          bgcolor: "#f5d9b0",
          height: 30,
          width: valueWidth,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", color: "#999899", marginLeft: 1 }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export const HeaderTextBox = ({ children, value, fontSize }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        marginLeft: 2,
        paddingTop: 1,
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: fontSize }}>
        {children}
      </Typography>
      <Typography sx={{ marginLeft: 1 }}>{value}</Typography>
    </Box>
  );
};
