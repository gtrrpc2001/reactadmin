import { Box, List, ListItem, ListItemText } from "@mui/material";
import { FunctionComponent } from "react";
import "./userMenuList.scss";
import { useLocation } from "react-router-dom";

type userMenuListProps = {
  userMenuList: {
    name: string;
    func: () => void;
    Icon: FunctionComponent<React.SVGProps<SVGSVGElement>>;
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
            <ListItem
              key={element.name}
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
                  location.pathname === element.path ? "#33afe4" : "#262626"
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
  );
};
