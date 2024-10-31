import { Hooks } from "react-table";
import { CellCheckbox } from "../checkbox/cellCheckbox";
import { useEffect, useState } from "react";
import { getDate, getToday } from "../modal/controller/modalController";

export const CellSelectHooks = (hooks: Hooks<object>) => {
  return hooks.visibleColumns.push((columns) => [
    {
      id: "selection",

      Cell: ({ row }) => {
        return (
          <div>
            <CellCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        );
      },
    },
    ...columns,
  ]);
};

export const useDateMemo = (writetime: string) => {
  const [currentDate, setCurrentDate] = useState(getDate(writetime));
  useEffect(() => {
    const newDate = getToday();
    if (newDate !== currentDate) {
      setCurrentDate(newDate);
    }
  }, [writetime, currentDate]);

  return currentDate;
};
