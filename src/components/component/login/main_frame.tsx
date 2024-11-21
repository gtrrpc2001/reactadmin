import { Grid, Paper, Typography } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { handleAnimateInit } from "../../../func/func";

interface MainFrameProps {
  children?: React.ReactNode;
  setExitAnimation: React.Dispatch<
    React.SetStateAction<{
      opacity: number;
      x: number;
    }>
  >;
}

export const MainFrame = (props: MainFrameProps) => {
  const navigate = useNavigate();
  return (
    <Paper elevation={24} className="loginPaper">
      {/* 타이틀  */}
      <Grid container className="Grid-Container">
        <Grid item xs={12} className="GridRow-center">
          <div
            className="titleWraper"
            onClick={() => {
              handleAnimateInit("/", props.setExitAnimation, navigate);
            }}
          >
            <Typography className="lookheartText" variant="h4">
              LOOKHEART
            </Typography>
          </div>
        </Grid>
      </Grid>
      {/* 타이틀  */}
      {props.children}
    </Paper>
  );
};
