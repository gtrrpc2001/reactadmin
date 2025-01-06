import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { calculTime } from "../../components/component/modal/controller/modalController";
import { getGraphEcgTime } from "../../data/graph";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type Props = {
  width: number;
  disabled: boolean;
  time: string;
  eq: string;
  handleTime: (value: dayjs.Dayjs | null) => void;
};

export const EcgTimePicker = ({
  width,
  disabled,
  eq,
  time,
  handleTime,
}: Props) => {
  const [data, setData] = useState<any[]>([]);
  const [isTimeListOpen, setTimeListOpen] = useState(false);
  const url = useSelector<RootState, string>((state) => state.comboBoxSelected);
  useEffect(() => {
    async function getData() {
      const times = calculTime(time, -1, 1, "YYYY-MM-DD", "days");
      const result = await getGraphEcgTime(eq, time, times, url);

      setData(result.map((item) => `${item.writetime}0`));
    }
    if (time != "" && eq != "") getData();
  }, [isTimeListOpen]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="측정 시간"
        disabled={disabled}
        ampm={false}
        minutesStep={10}
        skipDisabled={true}
        disableOpenPicker={false}
        slotProps={{
          popper: {
            sx: {
              "& .MuiList-root": {
                width: "80px",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                ".MuiButtonBase-root": {
                  width: "100%",
                },
              },
            },
          },
          textField: {
            InputProps: {
              disabled: true,
            },
            InputLabelProps: { shrink: true },
          },
        }}
        sx={{
          width: width,
          marginLeft: "10px",
          "& .MuiInputBase-root": {
            height: "45px",

            ".MuiInputBase-input": {
              fontSize: "0.85rem",
            },
          },
        }}
        shouldDisableTime={(value, _view) => {
          const temp = value.format("HH:mm").toString();
          return !data.includes(temp);
        }}
        onClose={() => {
          setTimeListOpen(false);
        }}
        onOpen={() => {
          setTimeListOpen(true);
        }}
        onChange={handleTime}
      />
    </LocalizationProvider>
  );
};
