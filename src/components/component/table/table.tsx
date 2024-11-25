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
  pageActions,
  profileActions,
} from "../../createslice/createslices";
import { getProfile } from "../../../axios/api/serverApi";
import { calculTime } from "../modal/controller/modalController";
import { historyLast } from "../../../axios/interface/history_last";
import * as mui from "@mui/material";

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

  const dict = useRef<{ value: any; using: boolean; count: number }[]>([]);

  const arrangedData = useMemo(() => {
    let tableArray = dict.current;
    if (tableArray.length === 0) {
      data.map((row: any) => {
        tableArray.push({ value: row, using: false, count: 0 });
      });
    } else {
      data.map((row: any) => {
        const memberIndex = tableArray.findIndex(
          (item: any) => item.value.idx === row.idx
        );

        if (memberIndex === -1) {
          // 전체 멤버 목록에 없으면 (완전 신규 가입) 테이블에 추가하기
          tableArray.push({ value: row, using: false, count: 0 });
        } else {
          // 이미 있는 사람일 경우
          const tableMember = tableArray[memberIndex];

          if (tableMember.using) {
            if (tableMember.value.changeTime === row.changeTime) {
              // 사용중이였던 사람의 측정시간이 이전과 같을 경우 미사용 검사 횟수 1 증가
              tableMember.count += 1;
              if (tableMember.count >= 3) {
                // 이전에 찼던 사람이 착용을 안 할 경우, 미사용 검사 횟수 기준 초과 : 3
                tableArray.splice(memberIndex, 1);
                const destIndex = tableArray.findIndex(
                  (item: any) => item.using === false
                );
                tableArray.splice(destIndex, 0, {
                  value: row,
                  using: false,
                  count: 0,
                });
              }
            } else {
              // 꾸준히 찼던 사람 이라면
              tableMember.count = 0;
              tableMember.value = row;
            }
          } else {
            // 미사용 중일 경우 측정 시간 비교를 통해 다시 사용중인지 검사, 측정 시간이 달라지면 사용중으로 전환
            if (tableMember.value.changeTime !== row.changeTime) {
              tableArray.splice(memberIndex, 1);
              const destIndex = tableArray.findIndex(
                (item: any) => item.using === false
              );
              tableArray.splice(destIndex, 0, {
                value: row,
                using: true,
                count: 0,
              });
            }
          }
        }
      });
    }

    return tableArray.map((item) => item.value);
  }, [data]);

  const [tableValue, setTableValue] = useState<any>(arrangedData);

  useEffect(() => {
    setTableValue(arrangedData);
  }, [arrangedData]);

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
    {
      columns,
      data: tableValue,
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
        <mui.Table {...getTableProps()}>
          <Theader headerGroups={headerGroups} />

          <Tbody
            BodyProps={getTableBodyProps}
            page={page}
            prepareRow={prepareRow}
            cellClick={onClickToggleModal}
          />
        </mui.Table>

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
