import React from "react";
import { TableState } from "react-table";
import "./tablePageMoveButton.scss";
import { TablePagination } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  setPageSize: (pagesize: number) => void;
  dataCount: number;
  state: TableState<object>;
};

export const TablePageMoveButton = ({
  gotoPage,
  setPageSize,
  dataCount,
  state,
}: Props) => {
  const [t, _i18n] = useTranslation();
  const handlePageChane = (_e: unknown, newPage: number) => {
    gotoPage(newPage);
  };

  const handleRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(e.target.value));
    gotoPage(0);
  };

  return (
    <TablePagination
      className="tablePagination"
      rowsPerPageOptions={[10, 15, 25, 50]}
      component="div"
      count={dataCount}
      rowsPerPage={state.pageSize}
      page={state.pageIndex}
      onPageChange={handlePageChane}
      onRowsPerPageChange={handleRowsPerPage}
      labelRowsPerPage={`${t("Rows / Page")} :`}
    />
  );
};
