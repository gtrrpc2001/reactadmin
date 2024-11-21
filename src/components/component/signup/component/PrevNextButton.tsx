import { Button, Grid } from "@mui/material";

type Props = {
  onClick: () => void;
  text: string;
  xs?: number;
  className?: string;
};

export const PrevNextButton = ({
  onClick,
  text,
  className = "submit_button",
  xs = 3,
}: Props) => {
  const button = (
    <Button className={className} onClick={onClick} variant="contained">
      {text}
    </Button>
  );

  return (
    <Grid item xs={xs} className="GridRow-center">
      {className === "submit_button" ? (
        <div className="SignUpWraper">{button}</div>
      ) : (
        button
      )}
    </Grid>
  );
};
