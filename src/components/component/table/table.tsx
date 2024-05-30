import React, { useMemo, useState } from "react";
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
import { PageSelect } from "../combobox/PageSelect";
import "./table.scss";
import { TablePageMoveButton } from "../buttons/tablePageMoveButton/tablePageMoveButton";
import { StopCheckbox } from "../checkbox/stopCheckbox";
import { Theader } from "./theader";
import { CellSelectHooks } from "../hooks/selectCheckboxHooks";
import { Tbody } from "./tbody";
import { Modal } from "../modal/modal";
import {
  cellActions,
  profileActions,
  yesterdayArrActions,
} from "../../createslice/createslices";
import { getOnlyArr, getProfile } from "../../../axios/api/serverApi";
import { calculTime } from "../modal/controller/modalController";
import { historyLast } from "../../../axios/interface/history_last";

type Props = {
  stopCheck: boolean;
  stopHandleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Table = ({ stopCheck, stopHandleCheckbox }: Props) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useSelector<RootState, any>((state) => state.historylast);
  const cellDispatch = useDispatch();
  const profileDispach = useDispatch();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    selectedFlatRows,
  } = useTable(
    { columns, data, autoResetSelectedRows: false },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    CellSelectHooks
  );

  const { pageSize, selectedRowIds } = state;

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
    const yesterday = times[0];
    if (column?.id != "selection") {
      if (!row?.isSelected) {
        const Profile = await getProfile(
          `/mslecgarr/arrCnt?eq=${eq}&startDate=${startDate}&endDate=${times[1]}`
        );
        const yesterdayArr = await getOnlyArr(
          `mslecgarr/arrCount?eq=${eq}&startDate=${yesterday}&endDate=${startDate}`
        );
        cellDispatch(yesterdayArrActions.count(yesterdayArr.arrCnt));
        profileDispach(profileActions.profile(Profile));
        cellDispatch(cellActions.cellValues(cellVlaue));
        setOpenModal(!isOpenModal);
      }
    }
  };

  return (
    <>
      <div className="table-pagesize">
        <div className="clsStopCheckbox">
          <StopCheckbox check={stopCheck} HandleCheckbox={stopHandleCheckbox} />
          <button
            className="selectButton"
            onClick={() => {
              const test = selectedFlatRows.map((d) => d.original);
              console.log(selectedFlatRows);
            }}
          >
            옵션
          </button>
          <Search onSubmit={setGlobalFilter} />
        </div>
        <div className="clsTableControll">
          <PageSelect pageSize={pageSize} setPageSize={(e) => setPageSize(e)} />
        </div>
      </div>

      <div className="table">
        <table {...getTableProps()}>
          <Theader headerGroups={headerGroups} />

          <Tbody
            BodyProps={getTableBodyProps}
            page={page}
            prepareRow={prepareRow}
            cellClick={onClickToggleModal}
          />
        </table>

        <TablePageMoveButton
          gotoPage={gotoPage}
          previousPage={previousPage}
          nextPage={nextPage}
          state={state}
          pageOptions={pageOptions}
          pageCount={pageCount}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
        />

        {isOpenModal && (
          <Modal open={isOpenModal} setModalOpen={setOpenModal}></Modal>
        )}
      </div>
    </>
  );
};

export default Table;
