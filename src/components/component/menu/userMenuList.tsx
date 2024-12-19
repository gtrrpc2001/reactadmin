import { Box, List, ListItemButton, ListItemText } from "@mui/material";
// import { FunctionComponent } from "react";
import "./userMenuList.scss";
import { useLocation } from "react-router-dom";

type userMenuListProps = {
  userMenuList: {
    name: string;
    func: () => void;
    Icon: string;
    path: string;
  }[];
};

export const UserMenuList = ({ userMenuList }: userMenuListProps) => {
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }} className="listWrapper">
      <List className="appBarListWrapper">
        {userMenuList.map((element) => {
          return (
            <ListItemButton
              key={element.name}
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
              <img
                src={element.Icon}
                alt="Table Icon"
                style={{
                  fill:
                    location.pathname === element.path ? "#33afe4" : "#262626",
                }}
              />
              <ListItemText
                primary={element.name}
                className={`listItemText ${
                  location.pathname === element.path ? "selected" : ""
                }`}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};
