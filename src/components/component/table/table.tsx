import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useGlobalFilter,
  useSortBy,
  usePagination,
  useTable,
  Row,
  useRowSelect,
  TableOptions,
  TableState,
} from "react-table";
import { Search } from "../search/search";
import { COLUMNS } from "../column/columns";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import "./table.scss";
import { TablePageMoveButton } from "../buttons/tablePageMoveButton/tablePageMoveButton";

import { Theader } from "./theader";
import {
  CellSelectHooks,
  useTableDataMemo,
} from "../hooks/selectCheckboxHooks";
import { Tbody } from "./tbody";
import { Modal } from "../modal/modal";
import {
  cellActions,
  pageActions,
  profileActions,
} from "../../createslice/createslices";
import { getProfile } from "../../../axios/api/serverApi";
import { calculTime } from "../modal/controller/modalController";
import { historyLast } from "../../../axios/interface/history_last";
import {
  Button,
  Table as MuiTable,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";

export const Table = () => {
  const columns: any = useMemo(() => COLUMNS, []);
  const data = useSelector<RootState, any>((state) => state.historylast);
  const cellDispatch = useDispatch();
  const profileDispach = useDispatch();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const dict = useRef<{ value: any; using: boolean; count: number }[]>([]);
  const arrangedData = useTableDataMemo(data, dict.current);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    page,
    gotoPage,
    setPageSize,
    state,
    selectedFlatRows,
  } = useTable(
    {
      columns: columns,
      data: arrangedData,
      autoResetSelectedRows: false,
      autoResetPage: false,
      autoResetGlobalFilter: false,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    CellSelectHooks
  );

  const onClickToggleModal = async (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    cell: any
  ) => {
    const row = cell?.row;
    const column = cell?.column;
    const values = cell?.row?.values;
    const { eq, eqname, timezone, writetime } = values;
    const getData: historyLast[] = data;
    const info = getData.filter((d) => d.eq == eq);
    const changtime = info.map((d) => d.changeTime)[0]?.split(" ")[0];
    const battery = info.map((d) => d.battery)[0];
    const startDate = writetime?.split(" ")[0];
    const cellVlaue = { eq, eqname, timezone, startDate, changtime, battery };
    const times = calculTime(startDate, -1, 1, "YYYY-MM-DD", "days");
    if (column?.id != "selection") {
      if (!row?.isSelected) {
        const Profile = await getProfile(
          `/mslecgarr/arrCnt?eq=${eq}&startDate=${startDate}&endDate=${times[1]}`
        );
        profileDispach(profileActions.profile(Profile));
        cellDispatch(cellActions.cellValues(cellVlaue));
        setOpenModal(!isOpenModal);
      }
    }
  };

  return (
    <div className="tableWrapper">
      <div className="table-pagesize">
        <div className="clsStopCheckbox">
          <Button
            className="selectButton"
            variant="outlined"
            onClick={() => {
              const test = selectedFlatRows.map((d) => d.original);
            }}
          >
            옵션
          </Button>
          <Search onSubmit={setGlobalFilter} />
        </div>
      </div>

      <TableContainer className="tableContainer">
        <MuiTable {...getTableProps()} className="table">
          <Theader headerGroups={headerGroups} />

          <Tbody
            BodyProps={getTableBodyProps}
            page={page}
            prepareRow={prepareRow}
            cellClick={onClickToggleModal}
          />
        </MuiTable>

        <TablePageMoveButton
          gotoPage={gotoPage}
          state={state}
          setPageSize={setPageSize}
          dataCount={rows.length}
        />

        {isOpenModal && (
          <Modal open={isOpenModal} setModalOpen={setOpenModal}></Modal>
        )}
      </TableContainer>
    </div>
  );
};

export default Table;
