import { Hooks } from "react-table";
import { CellCheckbox } from "../checkbox/cellCheckbox";

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
