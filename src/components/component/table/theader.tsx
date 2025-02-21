import { TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { HeaderGroup } from "react-table";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useTranslation } from "react-i18next";

type Props = {
  headerGroups: HeaderGroup<object>[];
};

export const Theader = ({ headerGroups }: Props) => {
  const [t, _i18n] = useTranslation();
  const exceptColumn = useSelector<RootState, String[]>(
    (state) => state.exceptColumn
  );

  return (
    <TableHead>
      {headerGroups.map(
        (
          headerGroup: {
            getHeaderGroupProps: () => JSX.IntrinsicAttributes &
              React.ClassAttributes<HTMLTableRowElement> &
              React.HTMLAttributes<HTMLTableRowElement>;
            headers: any[];
          },
          index
        ) => (
          <TableRow
            key={`thead${index}`}
            {...(headerGroup.getHeaderGroupProps() as any)}
          >
            {headerGroup.headers.map((column, columnIndex) => {
              if (!exceptColumn.includes(column.id)) {
                return (
                  <TableCell
                    key={`theadCell${columnIndex}`}
                    className="tableHeader"
                    {...column.getHeaderProps()}
                  >
                    <Typography align="left" className="tableHeaderCell">
                      {column.id != "selection"
                        ? t(column.render("Header"))
                        : ""}
                      {/* {column.render("Header")} */}
                    </Typography>
                  </TableCell>
                );
              }
            })}
          </TableRow>
        )
      )}
    </TableHead>
  );
};
