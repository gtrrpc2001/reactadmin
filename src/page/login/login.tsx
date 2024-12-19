import "./login.scss";
import { useState, SyntheticEvent } from "react";
import { useLocation } from "react-router-dom";
import { setInitialParams } from "../../func/func";
import { motion } from "framer-motion";
import { Tab, Tabs } from "@mui/material";
import { Login } from "../../components/component/login/login";

const LoginPage = () => {
  const location = useLocation();
  const pageStatus = location.state?.pageStatus || "init";
  const [userType, setUserType] = useState<"일반" | "보호자" | "기업">("일반");
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState(1);
  const [exitParams, setExitParams] = useState({ opacity: 0, x: 100 });

  function handleUserType(type: "일반" | "보호자" | "기업") {
    if (type !== null) {
      setUserType(type);
    }
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePw(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
  }

  function handleSelectedTab(_e: SyntheticEvent, value: any) {
    setSelectedTab(value);
  }

  return (
    <motion.div
      initial={setInitialParams(pageStatus)}
      animate={{ opacity: 1, x: 0 }}
      exit={exitParams}
      transition={{ duration: 0.5 }}
      className="SignInWraper"
    >
      <div className="Grid-Container">
        <Tabs
          value={selectedTab}
          onChange={handleSelectedTab}
          variant="fullWidth"
        >
          <Tab
            label="사용자"
            value={1}
            onClick={() => handleUserType("일반")}
          />
          <Tab label="기업" value={2} onClick={() => handleUserType("기업")} />
        </Tabs>

        <Login
          userType={userType}
          email={email}
          pw={pw}
          setExitAnimation={setExitParams}
          handleUserType={handleUserType}
          handleEmail={handleEmail}
          handlePw={handlePw}
          page={selectedTab}
        />
      </div>
    </motion.div>
  );
};
export default LoginPage;
