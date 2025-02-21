import "./login.scss";
import { useState, SyntheticEvent } from "react";
import { useLocation } from "react-router-dom";
import { setInitialParams } from "../../func/func";
import { motion } from "framer-motion";
import { Tab, Tabs } from "@mui/material";
import { Login } from "../../components/component/login/login";
import { LoginProvider } from "../../components/component/hooks/context/login_context";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const [t, _i18n] = useTranslation();
  const location = useLocation();
  const pageStatus = location.state?.pageStatus || "init";
  const [userType, setUserType] = useState<"일반" | "보호자" | "기업">("일반");
  const [selectedTab, setSelectedTab] = useState(1);
  const [exitParams, setExitParams] = useState({ opacity: 0, x: 100 });

  function handleUserType(type: "일반" | "보호자" | "기업") {
    if (type !== null) {
      setUserType(type);
    }
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
            label={t("User")}
            value={1}
            onClick={() => handleUserType("일반")}
          />
          <Tab
            label={t("Corp")}
            value={2}
            onClick={() => handleUserType("기업")}
          />
        </Tabs>
        <LoginProvider
          values={{
            userType,
            handleUserType,
            setExitParams,
            handlePage: handleSelectedTab,
            page: selectedTab,
          }}
        >
          <Login />
        </LoginProvider>
      </div>
    </motion.div>
  );
};
export default LoginPage;
