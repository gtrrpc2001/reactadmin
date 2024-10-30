import React, { useMemo } from "react";
import { ModalTopBodyLeft } from "../../../components/component/modal/body/bodyhome/topbody/modalTopbodyLeft";
import { ModalRealTimeGraph } from "../../graph/modalGraph";
import "./bedList.scss";
import { historyLast } from "../../../axios/interface/history_last";

type Props = {
  bedList: string[];
  bedStates: {
    [key: string]: boolean;
  };
  userData: historyLast[];
  bedClick: (name: string) => void;
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

  return (
    <>
      {bedList.map((b, index) => {
        let data;
        if (memoData.length >= 1) {
          data = memoData[index];
        }
        const bpm = data ? data.bpm : 0;
        const eq = data ? data.eq : "";
        const eqname = data ? data.eqname : "";
        const temp = data ? data.temp : 0;
        const writetime = data ? data.writetime : "";
        const key = eq + index;
        return (
          <React.Fragment key={key}>
            <div
              key={key}
              className={`bed ${bedStates[`${key}`] ? "ecgDisplay" : ""}`}
              onClick={() => bedClick(b)}
            >
              <div style={{ height: 25, textAlign: "center" }}>
                <span>{eqname}</span>
              </div>
              <div className="bpm">
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
