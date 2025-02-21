import React, { useState } from "react";
import "./search.scss";
import { Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  onSubmit: (FilterValue: any) => void;
};
export const Search = ({ onSubmit }: Props) => {
  const [t, _i18n] = useTranslation();
  const [filter, setFilter] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    try {
      event.preventDefault();
      onSubmit(filter);
    } catch (E) {
      console.log(E);
    }
  }

  return (
    <div className="formSearch">
      <form onSubmit={handleSubmit}>
        <TextField
          className="filterinput"
          name="filter"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          placeholder={`Search`}
        />
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          className="filterbutton"
        >
          {t("Search")}
        </Button>
      </form>
    </div>
  );
};
