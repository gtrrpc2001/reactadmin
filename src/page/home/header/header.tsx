import { useNavigate } from "react-router-dom";
import "./header.scss";
import TableIcon from "../../../assets/image/iconmonstr-small-thumbnail-lined.svg?react";
import GraphIcon from "../../../assets/image/iconmonstr-medical-7.svg?react";
import WardIcon from "../../../assets/image/iconmonstr-medical-1.svg?react";
import Server from "../../../assets/image/cloudtypeDeploy.svg?react";
import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import { saveLog } from "../../../data/login";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../../components/createslice/createslices";
import { AppDispatch, RootState } from "../../../store/store";
import { PropsWithChildren, useRef, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { AdminMenuList } from "../../../components/component/menu/adminMenuList";
import { UserMenuList } from "../../../components/component/menu/userMenuList";
import { useTranslation } from "react-i18next";

export const Header = ({ children }: PropsWithChildren) => {
  const [t, _i18n] = useTranslation();
  const navigation = useNavigate();
  const eqSelector = useSelector<RootState, string>((state) => state.eq);
  const useCheckDispatch = useDispatch<AppDispatch>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const titleClick = () => {
    navigation("/home");
  };

  const graphClick = () => {
    navigation("/home/graph");
  };

  const wardClick = () => {
    navigation("/home/ward");
  };

  const serverClick = () => {
    navigation("/cloud");
  };

  const HandleLogout = async () => {
    const loginBool = await saveLog(eqSelector, "로그아웃");
    useCheckDispatch(loginActions.loginCheck(!loginBool));
    navigation("/");
  };

  const toggleDrawer = () => {
    // 클릭이나 키보드 이벤트에 따라 Drawer를 제어
    setIsDrawerOpen(!isDrawerOpen);
  };

  const appBarList = [
    { name: t("User Info"), func: titleClick, Icon: TableIcon, path: "/home" },
    {
      name: t("Graph"),
      func: graphClick,
      Icon: GraphIcon,
      path: "/home/graph",
    },
    {
      name: t("Hospital"),
      func: wardClick,
      Icon: WardIcon,
      path: "/home/ward",
    },
    { name: t("Server"), func: serverClick, Icon: Server, path: "/cloud" },
  ];

  const adminMenuList = [
    {
      name: t("Product"),
      Icon: LocalMallIcon,
      contents: [
        { name: t("Product Current"), func: () => {}, path: "#" },
        { name: t("Product Regist"), func: () => {}, path: "#" },
        { name: t("Product Edit"), func: () => {}, path: "#" },
      ],
    },
  ];

  return (
    <Box>
      <div>
        <Drawer
          ref={drawerRef}
          className="AppDrawer"
          variant="persistent"
          anchor="left"
          open={isDrawerOpen}
          transitionDuration={300}
        >
          <div onClick={titleClick} className="headerTitleDiv">
            <Typography align="center" className="headerTitle">
              LOOKHEART
            </Typography>
          </div>

          <UserMenuList userMenuList={appBarList} />

          {eqSelector === import.meta.env.VITE_API_ADMIN && (
            <AdminMenuList adminMenuList={adminMenuList} />
          )}
          {/* -------- */}

          <div className="logoutbuttonDiv">
            <Button
              className="logoutbutton"
              onClick={HandleLogout}
              variant="outlined"
            >
              <LogoutIcon />
              <Typography sx={{ textTransform: "none" }} className="logOutText">
                {t("Sign Out")}
              </Typography>
            </Button>
          </div>
        </Drawer>
      </div>

      {/* Main Content */}
      <div className={`mainPage ${isDrawerOpen ? "open" : ""}`}>
        <Box className={`drawerButtonWrapper ${isDrawerOpen ? "open" : ""}`}>
          <IconButton
            ref={buttonRef}
            onClick={toggleDrawer}
            className="drawerButton"
          >
            {isDrawerOpen ? (
              <KeyboardArrowLeftIcon className="left" />
            ) : (
              <KeyboardArrowRightIcon className="right" />
            )}
          </IconButton>
        </Box>
        {children}
      </div>
    </Box>
  );
};
