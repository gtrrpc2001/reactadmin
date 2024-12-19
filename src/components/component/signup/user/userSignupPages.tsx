import { Grid2 } from "@mui/material";
import { motion } from "framer-motion";
import { PropsWithChildren, useState } from "react";
// import "../../../assets/agreement/useragree.txt";
import { PrevNextButton } from "../component/PrevNextButton";

type Props = {
  pageNumber: number;
  handlePrevButton: () => void;
  handleNextButton: () => void;
};

export const SignupPages = ({
  pageNumber,
  handlePrevButton,
  handleNextButton,
  children,
}: Props & PropsWithChildren) => {
  const [exitParams, setExitParams] = useState({ opacity: 0, x: 1 });

  const createNextButton = (text: string, exitOffset: number) => (
    <PrevNextButton
      onClick={() => {
        setExitParams({ opacity: 0, x: exitOffset });
        handleNextButton();
      }}
      text={text}
    />
  );

  const NextButton: { [key: number]: JSX.Element } = {
    1: createNextButton("동의", -100),
    2: createNextButton("다음", -100),
    3: createNextButton("다음", -100),
    4: createNextButton("완료", -100),
    5: createNextButton("돌아가기", 100),
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={exitParams}
      transition={{ duration: 0.5 }}
    >
      {children}
      <Grid2
        container
        justifyContent="space-between"
        className="Grid-Container"
      >
        {pageNumber != 5 && (
          <PrevNextButton onClick={handlePrevButton} text="이전" />
        )}
        {NextButton[pageNumber]}
      </Grid2>
    </motion.div>
  );
};
