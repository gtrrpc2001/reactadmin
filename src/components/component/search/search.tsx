import React, { useState } from "react";
import "./search.scss";
import { Button, TextField } from "@mui/material";

type Props = {
  onSubmit: (FilterValue: any) => void;
};
export const Search = ({ onSubmit }: Props) => {
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
        <Button variant="contained" className="filterbutton">
          검색
        </Button>
      </form>
    </div>
  );
};
