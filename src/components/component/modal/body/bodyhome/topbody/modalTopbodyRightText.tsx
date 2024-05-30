import Typography from "@mui/material/Typography";

type Props = {
  ArrCnt: number;
  position: string;
  compareArrChecked: boolean;
};

export const ModalTopbodyRightText = ({
  ArrCnt,
  position,
  compareArrChecked,
}: Props) => {
  return (
    <Typography
      sx={{
        fontFamily: "-moz-initial",
        fontSize: 13,
        color: "black",
        fontWeight: "bold",
        marginBlockStart: 3,
        position: position,
        right: 25,
        top: 75,
        whiteSpace: "pre-wrap",
        ":hover": { cursor: "default" },
      }}
      id="bpm"
      variant="h5"
      component="h5"
    >
      어제보다
      <Typography sx={{ fontSize: 13, fontWeight: "bold", height: 21 }}>
        <span className="arrCnt">{ArrCnt}</span> 회
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: 13,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span className="amount">{compareArrChecked ? "적게" : "많게"}</span>{" "}
        발생
      </Typography>
    </Typography>
  );
};
