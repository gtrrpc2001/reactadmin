import "./findAccount.scss";
import { Grid, Link, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { motion } from "framer-motion";
import { MainFrame } from "../../components/component/login/main_frame";
import { BackButton } from "../../components/component/findAccount/component/backButton";
import { FindEmail } from "../../components/component/findAccount/FindEmail";
import { FindPW } from "../../components/component/findAccount/FindPw";

type ComponentType = React.FC<{ setExitParams: (params: any) => void }>;

const componentsMap: { [key: number]: ComponentType } = {
  1: FindEmail,
  2: FindPW,
};

export const FindAccount = () => {
  const [exitParams, setExitParams] = useState({ opacity: 0, x: 100 });
  const [selectedTab, setSelectedTab] = useState(1);

  function handleSelectedTab(e: SyntheticEvent, value: any) {
    setSelectedTab(value);
  }

  function findPWPage(tabNumber: number) {
    const Component = componentsMap[tabNumber];

    if (Component) {
      return <Component setExitParams={setExitParams} />;
    }

    return null; // 유효하지 않은 tabNumber일 경우 null 반환
  }

  return (
    <div className="background">
      <MainFrame setExitAnimation={setExitParams}>
        <Grid container className="Grid-Container">
          <BackButton url={"/"} setExitParams={setExitParams} />
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={exitParams}
            transition={{ duration: 0.5 }}
            className="findPwWraper"
          >
            <div className="Grid-Container">
              <Tabs
                value={selectedTab}
                onChange={handleSelectedTab}
                variant="fullWidth"
              >
                <Tab label="이메일" value={1} />
                <Tab label="비밀번호" value={2} />
              </Tabs>

              {findPWPage(selectedTab)}
            </div>

            <Grid className="GridRow-center">
              <Typography className="FindPwFooter">
                계정이 등록되지 않았나요?{" "}
                <Link href="/signup" underline="none">
                  여기
                </Link>
                를 눌러 회원가입 하세요.
              </Typography>
            </Grid>
          </motion.div>
        </Grid>
      </MainFrame>
    </div>
  );
};
