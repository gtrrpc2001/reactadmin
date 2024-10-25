import React from "react";
import { ModalTopBodyLeft } from "../../../components/component/modal/body/bodyhome/topbody/modalTopbodyLeft";
import { modalValues } from "../../../axios/interface/modalvalues";
import { ModalRealTimeGraph } from "../../graph/modalGraph";
import "./bedList.scss";

type Props = {
  bedList: string[];
  bedStates: {
    [key: string]: boolean;
  };
  userData: modalValues;
  bedClick: (name: string) => void;
  BedEcgBtnClick: (key: string) => void;
};

export const BedListUI = ({
  bedList,
  bedStates,
  userData,
  bedClick,
  BedEcgBtnClick,
}: Props) => {
  const eq = "jhaseung@medsyslab.co.kr";
  return (
    <>
      {bedList.map((b, index) => {
        return (
          <React.Fragment key={index}>
            <div
              key={index}
              className={`bed ${bedStates[`${index}`] ? "ecgDisplay" : ""}`}
              onClick={() => bedClick(b)}
            >
              <div className="bpm">
                <ModalTopBodyLeft
                  bpm={userData.bpm}
                  temp={userData.temp}
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

              {bedStates[`${index}`] ? (
                <div className="ecg">
                  <ModalRealTimeGraph
                    open_close={bedStates[`${index}`]}
                    bpm={userData.bpm}
                    eq={eq}
                    time={userData.writetime}
                    width={350}
                    height={280}
                    Ywidth={35}
                  />
                </div>
              ) : (
                b
              )}
            </div>
            <button
              className="ecg-button"
              onClick={() => BedEcgBtnClick(`${index}`)}
            >
              {"<- ECG 보기"}
            </button>
          </React.Fragment>
        );
      })}
    </>
  );
};
