import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { handleAnimatePrev } from "../../../../func/func";

type Props = {
  url: string;
  setExitParams: React.Dispatch<
    React.SetStateAction<{
      opacity: number;
      x: number;
    }>
  >;
};

export const BackButton = ({ url, setExitParams }: Props) => {
  const navigate = useNavigate();
  return (
    <Grid container className="pageSelector">
      <Grid xs={4}>
        <div className="iconWraper">
          <div
            onClick={() => {
              handleAnimatePrev(url, setExitParams, navigate);
            }}
          >
            <NavigateBeforeIcon className="navBefore" />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
