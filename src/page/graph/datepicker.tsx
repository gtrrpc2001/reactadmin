import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";

type Props = {
  onChange: (value: any) => void;
  width: number;
  today: Dayjs;
};

export const GraphDatePicker = ({ onChange, width, today }: Props) => {
  const [t, _i18n] = useTranslation();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={t("Date")}
        defaultValue={today}
        onChange={(value: any, _context) => onChange(value)}
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
