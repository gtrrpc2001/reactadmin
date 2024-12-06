import { useLocation, useNavigate } from "react-router-dom";
import "./header.scss";
import { ReactComponent as TableIcon } from "../../../assets/image/iconmonstr-small-thumbnail-lined.svg";
import { ReactComponent as GraphIcon } from "../../../assets/image/iconmonstr-medical-7.svg";
import { ReactComponent as WardIcon } from "../../../assets/image/iconmonstr-medical-1.svg";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { saveLog } from "../../../data/login";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../../components/createslice/createslices";
import { AppDispatch, RootState } from "../../../store/store";
import {
  Children,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LogoutIcon from "@mui/icons-material/Logout";

export const Header = ({ children }: PropsWithChildren) => {
  const location = useLocation();
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
    { name: "사용자 현황", func: titleClick, Icon: TableIcon, path: "/home" },
    { name: "그래프", func: graphClick, Icon: GraphIcon, path: "/home/graph" },
    { name: "병동", func: wardClick, Icon: WardIcon, path: "/home/ward" },
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

          <Box sx={{ flexGrow: 1 }} className="listWrapper">
            <List className="appBarListWrapper">
              {appBarList.map((element) => {
                return (
                  <ListItem
                    button
                    onClick={element.func}
                    className="appBarListItem"
                    sx={{
                      backgroundColor:
                        location.pathname === element.path
                          ? "rgb(230, 244, 255)"
                          : "inherit",
                      borderRight:
                        location.pathname === element.path
                          ? "3px solid #33afe4"
                          : "none",
                    }}
                  >
                    <element.Icon
                      fill={
                        location.pathname === element.path
                          ? "#33afe4"
                          : "#262626"
                      }
                    />
                    <ListItemText
                      primary={element.name}
                      className={`listItemText ${
                        location.pathname === element.path ? "selected" : ""
                      }`}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <div className="logoutbuttonDiv">
            <Button
              className="logoutbutton"
              onClick={HandleLogout}
              variant="outlined"
            >
              <LogoutIcon />
              <Typography className="logOutText">로그아웃</Typography>
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
