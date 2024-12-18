import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

type Props = {
  onChange: (value: any) => void;
  width: number;
  today: Dayjs;
};

export const GraphDatePicker = ({ onChange, width, today }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="날짜"
        defaultValue={today}
        onChange={(value: any, context) => onChange(value)}
        sx={{
          width: width,
          "& .MuiInputBase-root": {
            height: "45px",
            ".MuiInputBase-input": {
              fontSize: "0.85rem",
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
