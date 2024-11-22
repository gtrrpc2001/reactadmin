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

  const memberCheckCount = useRef<{ [key: number]: number }>({});
  const usingMember = useRef<any[]>([]);
  const notUsingMember = useRef<any[]>([]);

  const arrangedData = useMemo(() => {
    data.map((row: any) => {
      const usingMemberIndex = usingMember.current.findIndex(
        (item: any) => item.idx === row.idx
      );
      if (usingMemberIndex !== -1) {
        // 사용중인 멤버 목록에 있으면
        if (
          usingMember.current[usingMemberIndex].changeTime === row.changeTime
        ) {
          console.log(
            "미사용 검사",
            row.eqname,
            memberCheckCount.current[row.idx]
          );
          // 사용자 목록의 측정 시간과 새 데이터의 측정 시간이 같다면
          if (memberCheckCount.current[row.idx] !== undefined) {
            memberCheckCount.current[row.idx] += 1;

            if (memberCheckCount.current[row.idx] >= 5) {
              // 5번 이상 체크되면
              console.log(
                "사용자 -> 미사용 전환",
                usingMember.current[usingMemberIndex]
              );
              usingMember.current.splice(usingMemberIndex, 1); // 사용자 -> 미사용자 전환 을 위한 기존 객체 삭제
              notUsingMember.current.unshift(row); // 미사용자의 0번째 자리로 추가
              delete memberCheckCount.current[row.idx]; // 사용자 체크 횟수 삭제
            }
          } else {
            // 최초 건수 발생
            console.log(
              "미사용 검사",
              row.eqname,
              memberCheckCount.current[row.idx]
            );
            memberCheckCount.current[row.idx] = 1;
          }
        } else {
          // 사용자 목록의 측정 시간과 새 데이터의 측정 시간이 다르다면
          usingMember.current[usingMemberIndex] = row;
          delete memberCheckCount.current[row.idx];
        }
      } else {
        // 미사용중인 멤버 라면

        const notUsingMemberIndex = notUsingMember.current.findIndex(
          (item: any) => item.idx === row.idx
        );

        if (notUsingMemberIndex === -1) {
          notUsingMember.current.push(row);
        } else {
          if (
            notUsingMember.current[notUsingMemberIndex].changeTime !==
            row.changeTime
          ) {
            notUsingMember.current.splice(notUsingMemberIndex, 1);
            usingMember.current.push(row);
          }
        }
      }
    });

    return [...usingMember.current, ...notUsingMember.current];
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
