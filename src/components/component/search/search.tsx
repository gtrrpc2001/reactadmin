import React, { useState } from "react";
import "./search.scss";

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
        <input
          className="filterinput"
          name="filter"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          placeholder={`Search`}
        />
        <button className="filterbutton">검색</button>
      </form>
    </div>
  );
};
