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

export const ProjectCard: React.FC<ProjectCardProps> = ({
  projectName,
  title,
  type,
  status,
  onConnect,
}) => {
  const statusToIconButtonStop = () => {
    switch (status) {
      case "running":
        return true;
      case "starting":
        return true;
      case "building":
        return true;
      case "stopped":
        return false;
      default:
        return true;
    }
  };
  const statusToIconButtonStart = () => {
    switch (status) {
      case "running":
        return false;
      case "starting":
        return false;
      case "building":
        return false;
      case "stopped":
        return true;
      default:
        return false;
    }
  };

  const statusToText = () => {
    switch (status) {
      case "running":
        return "실행 중";
      case "starting":
        return "시작 중";
      case "building":
        return "빌드 중";
      case "stopped":
        return "중지 됨";
    }
  };

  const statusToColor = () => {
    switch (status) {
      case "running":
        return "#2496f1";
      case "starting":
        return "#5ab75c";
      case "building":
        return "#5ab75c";
      case "stopped":
        return "#f75f46";
    }
  };

  const [startStat, setStartStat] = useState<boolean>(
    statusToIconButtonStart()
  );
  const [stopStat, setStopStat] = useState<boolean>(statusToIconButtonStop());

  useEffect(() => {
    setStartStat(statusToIconButtonStart());
    setStopStat(statusToIconButtonStop());
  }, [status]);

  const StatusDot = styled("span")<{ status: string }>(({ theme }) => ({
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: statusToColor(),
    display: "inline-block",
    marginRight: theme.spacing(1),
    boxShadow: `0 0 6px ${statusToColor()}`,
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
    <Card variant="outlined" sx={{ maxWidth: 300, margin: 2 }}>
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
                sx={{ marginRight: 0.5, color: statusToColor() }}
              >
                {statusToText()}
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
