import React, { useEffect, useState } from "react";
import { TableState } from "react-table";
import "./tablePageMoveButton.scss";
import { TablePagination } from "@mui/material";

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
  const { pageIndex } = state;
  const [inputValue, setInputValue] = useState(pageIndex + 1);
  useEffect(() => {
    setInputValue(pageIndex + 1);
  }, [pageIndex]);

  const handlePageChane = (e: unknown, newPage: number) => {
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
      page={pageIndex}
      onPageChange={handlePageChane}
      onRowsPerPageChange={handleRowsPerPage}
      labelRowsPerPage="행 / 페이지 :"
    />
  );
};
