import React from "react";
import { GotoPageButton } from "../GotoPageButton";
import { PageButton } from "../pageButton";
import { TableState } from "react-table";
import "./tablePageMoveButton.scss";

type Props = {
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  previousPage: () => void;
  nextPage: () => void;
  state: TableState<object>;
  pageOptions: number[];
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
};

export const TablePageMoveButton = ({
  gotoPage,
  previousPage,
  nextPage,
  state,
  pageOptions,
  pageCount,
  canPreviousPage,
  canNextPage,
}: Props) => {
  const { pageIndex } = state;

  function movePage(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    const pageNumber = value ? Number(value) - 1 : 0;
    gotoPage(pageNumber);
  }

  return (
    <div className="table-pagination">
      <GotoPageButton
        className="GotoPageButton"
        onClick={() => gotoPage(0)}
        pageCount={0}
        disabled={!canPreviousPage}
        children="<<"
      />

      <PageButton
        className="PageButton"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        children={"이전"}
      />

      <span>
        <strong className="prevStrong">
          {pageIndex + 1} / {pageOptions.length}
        </strong>
      </span>
      <span>
        페이지 이동:{" "}
        <input
          className="gotopageInput"
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => movePage(e)}
        />
      </span>

      <PageButton
        className="PageButton"
        onClick={() => nextPage()}
        disabled={!canNextPage}
        children={"다음"}
      />

      <GotoPageButton
        className="GotoPageButton"
        onClick={() => gotoPage(pageCount - 1)}
        pageCount={pageCount - 1}
        disabled={!canNextPage}
        children=">>"
      />
    </div>
  );
};
