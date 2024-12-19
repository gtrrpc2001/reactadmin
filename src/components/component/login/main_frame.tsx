import { Grid2, Paper, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

export const MainFrame = () => {
  const navigate = useNavigate();
  return (
    <div className="background">
      <Paper elevation={24} className="loginPaper">
        <Grid2 container className="Grid-Container">
          <Grid2 size={12} className="GridRow-center">
            <div
              className="titleWraper"
              onClick={() => {
                navigate("/");
              }}
            >
              <Typography className="lookheartText" variant="h4">
                LOOKHEART
              </Typography>
            </div>
          </Grid2>
        </Grid2>
        {<Outlet />}
      </Paper>
    </div>
  );
};
