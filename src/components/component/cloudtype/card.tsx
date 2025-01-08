import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  styled,
} from "@mui/material";
import StartIcon from "../../../assets/image/cloudtypeStart.svg?react";
import StopIcon from "../../../assets/image/cloudtypeStop.svg?react";
import BackendIcon from "../../../assets/image/cloudtypeBack.svg?react";
import FrontendIcon from "../../../assets/image/cloudtypeFront.svg?react";
import "./card.scss";
import { useEffect, useState } from "react";
import { setCloudTypeStart, setCloudTypeStop } from "../../../data/cloudtype";

interface ProjectCardProps {
  projectName: string;
  title: string;
  type: string;
  status: string;
  onConnect: () => void;
}

const Status = {
  RUNNING: "running",
  STARTING: "starting",
  BUILDING: "building",
  STOPPED: "stopped",
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  projectName,
  title,
  type,
  status,
  onConnect,
}) => {
  const getStatusProperties = () => {
    const properties = {
      iconButtonStop: true,
      iconButtonStart: false,
      text: "",
      color: "",
    };

    switch (status) {
      case Status.RUNNING:
        properties.iconButtonStop = true;
        properties.iconButtonStart = false;
        properties.text = "실행 중";
        properties.color = "#2496f1";
        break;
      case Status.STARTING:
        properties.iconButtonStop = true;
        properties.iconButtonStart = false;
        properties.text = "시작 중";
        properties.color = "#5ab75c";
        break;
      case Status.BUILDING:
        properties.iconButtonStop = true;
        properties.iconButtonStart = false;
        properties.text = "빌드 중";
        properties.color = "#5ab75c";
        break;
      case Status.STOPPED:
        properties.iconButtonStop = false;
        properties.iconButtonStart = true;
        properties.text = "중지 됨";
        properties.color = "#f75f46";
        break;
      default:
        properties.iconButtonStop = true;
        properties.iconButtonStart = true;
        properties.text = "알 수 없음";
        properties.color = "#000000";
        break;
    }

    return properties;
  };

  const [startStat, setStartStat] = useState<boolean>(
    getStatusProperties().iconButtonStart
  );
  const [stopStat, setStopStat] = useState<boolean>(
    getStatusProperties().iconButtonStop
  );

  useEffect(() => {
    setStartStat(getStatusProperties().iconButtonStart);
    setStopStat(getStatusProperties().iconButtonStop);
  }, [status]);

  const StatusDot = styled("span")<{ status: string }>(({ theme }) => ({
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: getStatusProperties().color,
    display: "inline-block",
    marginRight: theme.spacing(1),
    boxShadow: `0 0 6px ${getStatusProperties().color}`,
    opacity: 0.8,
  }));

  const TitleIcon = () => {
    return type == "web" ? (
      <FrontendIcon className="titleIcon" />
    ) : (
      <BackendIcon className="titleIcon" />
    );
  };

  const iconClickStat = (start: boolean, stop: boolean) => {
    setStartStat(start);
    setStopStat(stop);
  };

  const startClickHandler = async () => {
    if (startStat) {
      iconClickStat(false, true);
      await setCloudTypeStart({ projectName: projectName, name: title });
    }
  };

  const stopClickHandler = async () => {
    if (stopStat) {
      iconClickStat(true, false);
      await setCloudTypeStop({ projectName: projectName, name: title });
    }
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 300, margin: 2, borderRadius: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          {TitleIcon()}
          <Box>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {type}
            </Typography>
            <Box display="flex" alignItems="center">
              <StatusDot status={status} />
              <Typography
                variant="body2"
                sx={{ marginRight: 0.5, color: getStatusProperties().color }}
              >
                {getStatusProperties().text}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
            paddingRight: 0.5,
          }}
        >
          <StartIcon
            className="myIcon"
            onClick={() => startClickHandler()}
            fill={!startStat ? "#c1c0da" : ""}
          />
          <StopIcon
            className="myIcon"
            onClick={() => stopClickHandler()}
            fill={!stopStat ? "#c1c0da" : ""}
          />
          <Box sx={{ width: 200, display: "flex", justifyContent: "end" }}>
            {type != "backend" && (
              <Button
                variant="contained"
                color="primary"
                onClick={onConnect}
                sx={{ height: 25, fontSize: 12 }}
              >
                접속하기
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
