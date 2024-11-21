import { TableCell, TableRow } from "@mui/material";
import { Row, TableBodyPropGetter, TableBodyProps } from "react-table";

type Props = {
  BodyProps: (
    propGetter?: TableBodyPropGetter<object> | undefined
  ) => TableBodyProps;
  page: Row<object>[];
  prepareRow: (row: Row<object>) => void;
  cellClick: (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    cell: any
  ) => void;
};

export const Tbody = ({ BodyProps, page, prepareRow, cellClick }: Props) => {
  const info = (cell: any) => {
    const header = cell.column.Header;
    let changeTimezone = "";
    if (header == "국가") {
      const value: string = cell.value;
      if (value.includes("-08:00")) {
        changeTimezone = value.replace("KR", "US");
        return changeTimezone;
      }
    }
    return cell.render("Cell");
  };

  return (
    <tbody {...BodyProps()}>
      {page.map((row: Row) => {
        prepareRow(row);
        return (
          <TableRow className="tbody_tr" {...row.getRowProps()}>
            {row.cells.map((cell: any) => (
              <TableCell
                {...cell.getCellProps()}
                onClick={(e) => cellClick(e, cell)}
              >
                {info(cell)}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </tbody>
  );
};
