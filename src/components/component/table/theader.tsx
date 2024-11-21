import { TableHead } from "@mui/material";
import { HeaderGroup } from "react-table";

type Props = {
  headerGroups: HeaderGroup<object>[];
};

export const Theader = ({ headerGroups }: Props) => {
  return (
    <TableHead>
      {headerGroups.map(
        (headerGroup: {
          getHeaderGroupProps: () => JSX.IntrinsicAttributes &
            React.ClassAttributes<HTMLTableRowElement> &
            React.HTMLAttributes<HTMLTableRowElement>;
          headers: any[];
        }) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        )
      )}
    </TableHead>
  );
};
