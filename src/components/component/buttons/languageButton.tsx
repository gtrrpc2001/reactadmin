import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageIcon from "../../../assets/image/language.svg?react";

export const LanguageButton = () => {
  const [_t, i18n] = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const option = [
    {
      value: "en",
      text: "EN",
    },
    {
      value: "ko",
      text: "KO",
    },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState<string>("AUTO");
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (option: { value: string; text: string }) => {
    setSelectedLanguage(option.text);
    i18n.changeLanguage(option.value);
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        variant="text"
        color="inherit"
        sx={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000 }}
      >
        <LanguageIcon />
        <Typography
          textTransform={"none"}
          sx={{
            paddingLeft: 0.5,
          }}
        >
          {selectedLanguage}
        </Typography>
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {option.map((item) => (
          <MenuItem onClick={() => changeLanguage(item)}>{item.text}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};
