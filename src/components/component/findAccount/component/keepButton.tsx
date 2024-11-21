import { Button, Grid } from "@mui/material";
import { handleAnimateNext } from "../../../../func/func";
import { useNavigate } from "react-router-dom";

type Props = {
  disabled: boolean;
  onClick: () => void;
};

export const KeepButton = ({ onClick, disabled }: Props) => {
  const navigate = useNavigate();
  return (
    <Grid className="GridRow-center">
      <Button
        className="submitEmailButton"
        variant="contained"
        onClick={onClick}
        disabled={disabled}
      >
        계속하기
      </Button>
    </Grid>
  );
};
