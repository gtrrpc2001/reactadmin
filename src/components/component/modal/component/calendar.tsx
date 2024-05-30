import { Box } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickerSelectionState } from "@mui/x-date-pickers/internals";

type Props = {
  handler: (value: unknown, cal: PickerSelectionState | undefined) => void;
};

export const Calendar = ({ handler }: Props) => {
  return (
    <Box sx={{ position: "absolute", left: 360 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          sx={{ borderRadius: 5, color: "black", bgcolor: "white" }}
          onChange={(value, cal) => handler(value, cal)}
        />
      </LocalizationProvider>
    </Box>
  );
};
