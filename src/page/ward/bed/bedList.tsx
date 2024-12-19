import React, { useEffect, useMemo, useState } from "react";
import { ModalTopBodyLeft } from "../../../components/component/modal/body/bodyhome/topbody/modalTopbodyLeft";
import { ModalRealTimeGraph } from "../../graph/modalGraph";
import "./bedList.scss";
import { historyLast } from "../../../axios/interface/history_last";
import { BedAlarm } from "./alarm/alarm";

type Props = {
  bedList: string[];
  bedStates: {
    [key: string]: boolean;
  };
  userData: historyLast[];
  bedClick: (name: string, eq: string) => void;
  BedEcgBtnClick: (key: string) => void;
  cfData: historyLast[];
};

export const BedListUI = ({
  bedList,
  bedStates,
  userData,
  bedClick,
  BedEcgBtnClick,
  cfData,
}: Props) => {
  const memoData = useMemo(() => {
    const userDataMap = new Map(userData.map((user) => [user.eq, user]));
    const currentUsers = new Map<string, historyLast>();
    cfData.forEach((u) => {
      const existingUser = userDataMap.get(u.eq);
      if (
        existingUser &&
        new Date(u.writetime) < new Date(existingUser.writetime)
      ) {
        currentUsers.set(existingUser.eq, existingUser);
      }
    });

    userData.forEach((user) => {
      const existingUser = currentUsers.get(user.eq);

      if (!existingUser) {
        currentUsers.set(user.eq, user);
      } else {
        if (new Date(user.writetime) > new Date(existingUser.writetime)) {
          currentUsers.set(user.eq, user);
        }
      }
    });
    return Array.from(currentUsers.values());
  }, [userData, cfData]);

  const [notificationStates, setNotificationStates] = useState(
    Array(bedList.length).fill(false)
  );

  const [notificationPositions, setNotificationPositions] = useState<
    { top: number; left: number }[]
  >(Array(bedList.length).fill({ top: 0, left: 0 }));

  const [arrList, setArrlist] = useState<Map<string, number>>(new Map());

  const [fixedWritetimes, setFixedWritetimes] = useState<string[]>(
    Array(bedList.length).fill("")
  );

  const handleCloseNotification = (index: number) => {
    setNotificationStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };

  useEffect(() => {
    const initialArrList = new Map<string, number>();
    memoData.forEach((data, index) => {
      const key = data.eq + index;
      initialArrList.set(key, data.arrcnt);
    });
    setArrlist(initialArrList);
  }, []);

  useEffect(() => {
    const updateNotifications = () => {
      bedList.forEach((_b, index) => {
        let data;
        if (memoData.length >= 1) {
          data = memoData[index];
        }
        const arrCnt = data ? data.arrcnt : 0;
        const eq = data ? data.eq : "";
        const key = `${eq} ${index}`;
        const writetime = data ? data.writetime : "";

        if (arrList.has(key)) {
          const previousArrCnt = arrList.get(key);
          if (arrCnt != previousArrCnt) {
            setNotificationStates((prevStates) => {
              const newStates = [...prevStates];
              newStates[index] = true;

              if (!fixedWritetimes[index]) {
                setFixedWritetimes((prevWritetimes) => {
                  const newWritetimes = [...prevWritetimes];
                  newWritetimes[index] = writetime;
                  return newWritetimes;
                });
              }

              return newStates;
            });

            setArrlist((prev) => {
              const newMap = new Map(prev);
              newMap.set(key, arrCnt);
              return newMap;
            });
          }
        } else {
          setArrlist((prev) => {
            const newMap = new Map(prev);
            newMap.set(key, arrCnt);
            return newMap;
          });
        }

        const bedElement = document.getElementById(key);
        if (bedElement) {
          const rect = bedElement.getBoundingClientRect();
          const newPosition = {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
          };
          setNotificationPositions((prevPositions) => {
            const newPositions = [...prevPositions];
            newPositions[index] = newPosition;
            return newPositions;
          });
        }
      });
    };
    updateNotifications();
  }, [bedList, memoData]);

  const getNameChanged = (name: string) => {
    const check = name.search(" ");
    const middleIndex =
      check != -1 && check != 0
        ? Math.floor(name.length / 2) - 1
        : Math.floor(name.length / 2);
    const modifiedName = name
      .split("")
      .map((char, index) => {
        return index === middleIndex ? "X" : char; // 가운데 글자만 'X'로 변경
      })
      .join("");

    return modifiedName;
  };

  return (
    <>
      {bedList.map((b, index) => {
        let data;
        if (memoData.length >= 1) {
          data = memoData[index];
        }
        const bpm = data ? data.bpm : 0;
        const eq = data ? data.eq : "";

        const eqname = data ? getNameChanged(data.eqname) : "";

        const temp = data ? data.temp : 0;
        const writetime = data ? data.writetime : "";
        const alarmTime =
          fixedWritetimes.length > 0 ? fixedWritetimes[index] : writetime;

        const key = `${eq} ${index}`;

        return (
          <React.Fragment key={key}>
            <div
              key={key}
              className={`bed ${bedStates[`${key}`] ? "ecgDisplay" : ""}`}
              onClick={() => bedClick(b, eq)}
            >
              <div style={{ height: 25, textAlign: "center" }}>
                <span>{eqname}</span>
              </div>
              <div className="bpm">
                {notificationStates[index] && (
                  <BedAlarm
                    message={`${alarmTime}에 비정상 맥방이 발생 했습니다.`}
                    onClose={() => handleCloseNotification(index)}
                    position={notificationPositions[index]}
                  />
                )}
                <ModalTopBodyLeft
                  bpm={bpm}
                  temp={temp}
                  width={50}
                  height={20}
                  borderRadius={3}
                  fontSize={20}
                  marginBlockStart={0.5}
                  top={-9}
                  left={27}
                  heartSize="small"
                />
              </div>

              {bedStates[`${key}`] ? (
                <div className="ecg">
                  <ModalRealTimeGraph
                    open_close={bedStates[`${key}`]}
                    bpm={bpm}
                    eq={eq}
                    time={writetime}
                    width={350}
                    height={235}
                    Ywidth={35}
                  />
                </div>
              ) : (
                b
              )}
            </div>
            <button
              className="ecg-button"
              onClick={() => BedEcgBtnClick(`${key}`)}
            >
              {"<- ECG 보기"}
            </button>
          </React.Fragment>
        );
      })}
    </>
  );
};
