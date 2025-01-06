import { SetStateAction, useEffect, useRef, useState } from "react";
import { Box, Divider, IconButton } from "@mui/material";
import { GraphDatePicker } from "./datepicker";
import { getGraphBpmHrvArrData, getGraphEcgValue } from "../../data/graph";
import { Graphs } from "./graphBpmHrvArr";
import { graphKindButton } from "../../axios/interface/graph";
import { getCalendarTime, getWritetimeSelectHour_Min } from "../../func/func";
import {
  calculTime,
  getClickGraphKindButton,
} from "../../components/component/modal/controller/modalController";
import { getCalStep } from "../../components/component/modal/data/data";
import dayjs, { Dayjs } from "dayjs";
import { UserSelect } from "./userSelect";
import { EcgTimePicker } from "./ecgTimePicker";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { exportToExcel } from "../../func/excel";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type Props = {
  names: { eq: string; eqname: string }[];
  graphId: string;
  onDelete: (id: string) => void;
};

const getCheckMaxValue = (value: number) => (value > 180 ? 180 : value);

export const GraphBody = ({ names, graphId, onDelete }: Props) => {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [kindButton, setKindButton] = useState<graphKindButton>({
    bpm_hrv_arr: true,
    cal_step: false,
    ecg: false,
  });
  const [writetime, setWritetime] = useState<string>(getCalendarTime(dayjs()));
  const [ecgTime, setEcgTime] = useState<string>("");
  const prevEcgTime = useRef<string>("");
  const loginSelector = useSelector<RootState, string>((state) => state.eq);
  const url = useSelector<RootState, string>((state) => state.comboBoxSelected);

  async function getData(
    id: string,
    time: string,
    kindButton: graphKindButton,
    setData: React.Dispatch<React.SetStateAction<any[]>>
  ) {
    try {
      if (id != "" && time != "") {
        let result;
        let v: any[] = [];
        const calTime = calculTime(time, -1, 1, "YYYY-MM-DD", "days");
        switch (true) {
          case kindButton.ecg:
            setEcgTime("");
            break;
          case kindButton.cal_step:
            result = await getCalStep(id, time, calTime[1], 13, url);
            v = result?.map((d) => {
              return {
                step: d.step,
                distanceKM: d.distanceKM,
                cal: d.cal,
                calexe: d.calexe,
                writetime: d.writetime,
              };
            });
            break;
          default:
            result = await getGraphBpmHrvArrData(id, time, calTime, url);
            v = result?.map((d) => {
              return {
                bpm: getCheckMaxValue(d.bpm),
                hrv: getCheckMaxValue(d.hrv),
                arr: d.count,
                writetime: getWritetimeSelectHour_Min(d.writetime),
              };
            });
            break;
        }

        setData(v);
      }
    } catch {}
  }

  useEffect(() => {
    getData(id, writetime, kindButton, setData);
    prevEcgTime.current = "";
  }, [id, writetime, kindButton]);

  useEffect(() => {
    async function getEcgData() {
      if (ecgTime != "") {
        const startTime = `${writetime} ${ecgTime}`;
        const endTime = calculTime(
          startTime,
          0,
          10,
          "YYYY-MM-DD HH:mm",
          "minute"
        )[1];
        const result = await getGraphEcgValue(id, startTime, endTime, url);
        const ecgList: SetStateAction<any[]> = [];
        result.forEach((d) => {
          d.ecg.forEach((e) => {
            ecgList.push({ ecg: e, writetime: d.writetime });
          });
        });
        setData(ecgList);
      }
    }
    getEcgData();
  }, [ecgTime]);

  const selectUserHandler = (
    _event: React.SyntheticEvent,
    value: { eq: string; eqname: string } | null,
    _reason: string
  ) => {
    setId(value ? value.eq : "");
    setName(value ? value.eqname : "");
  };

  const pickerChange = (value: any) => {
    const currentTime = getCalendarTime(value);
    setWritetime(currentTime);
  };

  const ToolboxIconClickHandler = (id: string) => {
    const iconClick: graphKindButton = getClickGraphKindButton(id);
    setKindButton(iconClick);
  };

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      const formattedTime = newValue.format("HH:mm");
      setEcgTime(formattedTime);
    } else {
      setEcgTime("");
    }
  };

  const getEcgFileDownload = () => {
    if (
      loginSelector == import.meta.env.VITE_API_ADMIN &&
      name.length != 0 &&
      ecgTime
    ) {
      exportToExcel(
        data,
        `${name}님의 ${writetime} ${ecgTime} 부터 10분간 ECG데이터`
      );
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "top",
        }}
      >
        <UserSelect
          userList={names}
          onChange={selectUserHandler}
          data={data}
          dataKind={kindButton}
        />

        <Box
          flexGrow={1}
          maxWidth={"calc(100vw - 300px - 170px)"}
          paddingLeft={"20px"}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <GraphDatePicker
              onChange={pickerChange}
              width={150}
              today={dayjs()}
            />
            <Box flexGrow={1}>
              <EcgTimePicker
                width={150}
                disabled={!kindButton.ecg}
                time={writetime}
                eq={id}
                handleTime={handleChange}
              />
            </Box>
            <Box>
              <IconButton
                onClick={() => onDelete(graphId)}
                sx={{ marginRight: "20px" }}
              >
                <DeleteOutlineIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <Graphs
              data={data}
              id={id}
              writetime={writetime}
              kind={kindButton}
              kindButtonHandler={ToolboxIconClickHandler}
              downloadECG={getEcgFileDownload}
            />
          </Box>
        </Box>
      </Box>
      <Divider sx={{ marginTop: "10px", marginBottom: "20px" }} />
    </Box>
  );
};
