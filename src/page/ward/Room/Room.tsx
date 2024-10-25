import { Button, styled } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Room.scss";
import { BedInfo } from "../modal/bedModal";
import { useEffect, useState } from "react";
import { historyLast } from "../../../axios/interface/history_last";
import { modalValues } from "../../../axios/interface/modalvalues";
import { getValues } from "../../../components/component/modal/controller/modalController";
import { ModalRealTimeGraph } from "../../graph/modalGraph";
import { getHistory } from "../../../axios/api/serverApi";
import React from "react";
import { ModalTopBodyLeft } from "../../../components/component/modal/body/bodyhome/topbody/modalTopbodyLeft";

type Props = {
  setRoomVisible: React.Dispatch<React.SetStateAction<boolean>>;
  roomId: number;
};

const bedList = ["침대 1", "침대 2", "침대 3", "침대 4", "침대 5", "침대 6"];

export const Room = ({ setRoomVisible, roomId }: Props) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [bedStates, setBedStates] = useState<{ [key: string]: boolean }>({});
  const [data, setData] = useState<historyLast[]>([]);
  const eq = "jhaseung@medsyslab.co.kr";
  const bedClick = (name: string) => {
    setOpenModal(true);
  };

  const BedEcgBtnClick = (key: string) => {
    setBedStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

  const [userData, setUserData] = useState<modalValues>(getValues(data, eq));

  useEffect(() => {
    setUserData(getValues(data, eq));
  }, [data]);

  useEffect(() => {
    async function getInfoList() {
      try {
        const getData: historyLast[] = await getHistory(
          `/mslLast/webTable?eq=${eq}`
        );

        if (getData?.length != 0 && !String(getData).includes("result")) {
          setData(getData);
        }
      } catch (E) {
        console.log(E);
        return [];
      }
    }

    const timer = setInterval(async () => {
      await getInfoList();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
    // let timer: NodeJS.Timeout | null = null;

    // if (Object.values(bedStates).some((state) => state)) {
    //   timer = setInterval(async () => {
    //     await getInfoList();
    //   }, 1000);
    // } else if (timer) {
    //   clearInterval(timer);
    // }

    // return () => {
    //   if (timer) {
    //     clearInterval(timer);
    //   }
    // };
  }, [bedStates]);

  const getBedList = () => {
    return bedList.map((b, index) => {
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
                  eq="jhaseung@medsyslab.co.kr"
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
    });
  };

  return (
    <>
      <div className="Room">
        <Button
          startIcon={<ArrowBackIcon style={{ fontSize: "2rem" }} />}
          onClick={() => {
            setRoomVisible((visible) => !visible);
          }}
        ></Button>
        <div className="roomDisplay">
          <div className="roomSize">
            <div className="bed-wrap">{getBedList()}</div>
          </div>
        </div>
      </div>
      {isOpenModal && (
        <BedInfo open={isOpenModal} setModalOpen={setOpenModal}></BedInfo>
      )}
    </>
  );
};
