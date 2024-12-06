import { Hooks } from "react-table";
import { CellCheckbox } from "../checkbox/cellCheckbox";
import { useEffect, useMemo, useState } from "react";
import { getDate, getToday } from "../modal/controller/modalController";

export const CellSelectHooks = (hooks: Hooks<object>) => {
  return hooks.visibleColumns.push((columns) => [
    {
      id: "selection",

      Cell: ({ row }) => {
        return (
          <div>
            <CellCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        );
      },
    },
    ...columns,
  ]);
};

export const useDateMemo = (writetime: string) => {
  const [currentDate, setCurrentDate] = useState(getDate(writetime));
  useEffect(() => {
    const newDate = getToday();
    if (newDate !== currentDate) {
      setCurrentDate(newDate);
    }
  }, [writetime, currentDate]);

  return currentDate;
};

export const useTableDataMemo = (
  data: any,
  dict: { value: any; using: boolean; count: number }[]
) => {
  const resultData = useMemo(() => {
    let tableArray = dict;
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

    return tableArray.map((item) => {
      const newValue = { ...item.value, using: item.using };

      return newValue;
    });
  }, [data]);

  return resultData;
};
