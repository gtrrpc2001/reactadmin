import { Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { PrevNextButton } from "../../signup/component/PrevNextButton";

type Props = {
  onClick: () => void;
  text: string;
  className: string;
};

export const LastPage = ({ onClick, text, className }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <Grid xs={12} className="GridRow-center">
        <Typography className={className}>{text}</Typography>
      </Grid>
      <Grid xs={12} className="GridRow-center"></Grid>
      <PrevNextButton
        onClick={onClick}
        text={"돌아가기"}
        className="submitEmailButton"
        xs={12}
      />
    </motion.div>
  );
};
