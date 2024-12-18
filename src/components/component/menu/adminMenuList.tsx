import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  SvgIconTypeMap,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import "./adminMenuList.scss";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type AdminListProps = {
  adminMenuList: {
    name: string;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    contents: {
      name: string;
      func: () => void;
      path: string;
    }[];
  }[];
};

export const AdminMenuList = ({ adminMenuList }: AdminListProps) => {
  const [productIsOpen, setProductIsOpen] = useState(false);
  const toggleProductMenu = () => {
    setProductIsOpen(!productIsOpen);
  };

  return (
    <Box className="adminMenuList">
      <Divider />
      <List className="appBarListWrapper">
        {adminMenuList.map((item) => {
          return (
            <div>
              <ListItemButton
                onClick={toggleProductMenu}
                className="adminListButton"
              >
                <item.Icon />
                <ListItemText primary={item.name} className="adminListTitle" />
                {productIsOpen ? <ExpandMore /> : <KeyboardArrowRightIcon />}
              </ListItemButton>

              <Collapse in={productIsOpen}>
                <List component={"div"}>
                  {item.contents.map((content) => {
                    return (
                      <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText primary={content.name} />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </div>
          );
        })}
      </List>
    </Box>
  );
};
