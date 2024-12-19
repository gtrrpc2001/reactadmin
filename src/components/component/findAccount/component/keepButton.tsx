import { Button, Grid2 } from "@mui/material";

type Props = {
  disabled: boolean;
  onClick: () => void;
};

export const KeepButton = ({ onClick, disabled }: Props) => {
  return (
    <Grid2 className="GridRow-center">
      <Button
        className="submitEmailButton"
        variant="contained"
        onClick={onClick}
        disabled={disabled}
      >
        계속하기
      </Button>
    </Grid2>
  );
};
