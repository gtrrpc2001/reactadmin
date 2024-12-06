import {
  Box,
  Chip,
  LinearProgress,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Cell, Row, TableBodyPropGetter, TableBodyProps } from "react-table";
import { RootState } from "../../../store/store";

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
  const exceptColumn = useSelector<RootState, String[]>(
    (state) => state.exceptColumn
  );

  const info = (row: Row, cell: Cell<{}, any>) => {
    const header = cell.column.Header;

    if (header == "아이디") {
      const email = cell.value;
      const username = row.cells[3].value;

      return (
        <div className="cellUserInfo">
          <Typography className="cellUserName">{username}</Typography>
          <Typography className="cellEmail">{email}</Typography>
        </div>
      );
    }

    if (header == "장치명") {
      const deviceSerial = cell.value;
      const battery = row.cells[13].value;

      return (
        <div>
          <Typography className="cellDeviceName">{deviceSerial}</Typography>
          <Box width="100%">
            <Typography>{battery}%</Typography>
            <LinearProgress variant="determinate" value={battery} />
          </Box>
        </div>
      );
    }

    if (header == "지역") {
      const timezone: String = cell.value;
      const splitCountry = timezone.split("/");
      const city = splitCountry[2];
      return <Typography>{city}</Typography>;
    }

    if (header == "측정시각") {
      const splitDate: String = cell.value.split(" ");

      return (
        <div>
          <Typography align="left" className="writedate">
            {splitDate[0]}
          </Typography>
          <Typography align="left" className="writetime">
            {splitDate[1]}
          </Typography>
        </div>
      );
    }

    if (header == "상태") {
      if (cell.value == true) {
        return (
          <Box className="userStatusCell">
            <Box className="userStatus using" />
            <Typography className="userStatusLabel">사용</Typography>
          </Box>
        );
      } else {
        return (
          <Box className="userStatusCell">
            <Box className="userStatus notUsing" />
            <Typography className="userStatusLabel">미사용</Typography>
          </Box>
        );
      }
    }

    return cell.render("Cell");
  };

  return (
    <TableBody {...BodyProps()}>
      {page.map((row: Row) => {
        prepareRow(row);

        return (
          <TableRow className="tbody_tr" {...row.getRowProps()}>
            {row.cells.map((cell) => {
              if (!exceptColumn.includes(cell.column.id)) {
                return (
                  <TableCell
                    className="tbody_cell"
                    {...cell.getCellProps()}
                    onClick={(e) => cellClick(e, cell)}
                  >
                    {info(row, cell)}
                  </TableCell>
                );
              }
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};
