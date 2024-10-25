import { Button, styled } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Room.scss";
import { BedInfo } from "../modal/bedModal";
import { useEffect, useState } from "react";
import { historyLast } from "../../../axios/interface/history_last";
import { modalValues } from "../../../axios/interface/modalvalues";
import { getValues } from "../../../components/component/modal/controller/modalController";
import { getHistory } from "../../../axios/api/serverApi";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { PatientDroppable } from "../patient/patientDroppable";
import { BedListUI } from "../bed/bedList";

type Props = {
  setRoomVisible: React.Dispatch<React.SetStateAction<boolean>>;
  roomId: number;
};

const bedList = ["침대 1", "침대 2", "침대 3", "침대 4", "침대 5", "침대 6"];
const patientList = ["환자 A", "환자 B", "환자 C", "환자 D", "환자 E"];

export const Room = ({ setRoomVisible, roomId }: Props) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [bedStates, setBedStates] = useState<{ [key: string]: boolean }>({});
  const [data, setData] = useState<historyLast[]>([]);
  const eq = "jhaseung@medsyslab.co.kr";
  const [userData, setUserData] = useState<modalValues>(getValues(data, eq));
  const [assignedPatients, setAssignedPatients] = useState<string[]>(
    Array(bedList.length).fill(null)
  );

  const bedClick = (name: string) => {
    setOpenModal(true);
  };

  const BedEcgBtnClick = (key: string) => {
    setBedStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

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

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedPatients = Array.from(assignedPatients);
    // 환자를 침대에 배치
    if (
      result.source.droppableId === "patientList" &&
      result.destination.droppableId === "bedList"
    ) {
      updatedPatients[result.destination.index] =
        patientList[result.source.index];
    }
    // 환자 이동 (침대 간 이동은 현재 구현하지 않음)
    else if (
      result.source.droppableId === "bedList" &&
      result.destination.droppableId === "bedList"
    ) {
      const [removed] = updatedPatients.splice(result.source.index, 1);
      updatedPatients.splice(result.destination.index, 0, removed);
    }

    setAssignedPatients(updatedPatients);
  };

  // {assignedPatients[index] ? (
  //   <div className="patient-info">
  //     {assignedPatients[index]} {/* 할당된 환자 이름 표시 */}
  //     <ModalRealTimeGraph
  //       open_close={bedStates[`${index}`]}
  //       bpm={userData.bpm}
  //       eq={eq}
  //       time={userData.writetime}
  //       width={350}
  //       height={280}
  //       Ywidth={35}
  //     />
  //   </div>
  // ) : (
  //   b
  // )}
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
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="roomSize">
              <Droppable droppableId="bedList">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bed-wrap"
                  >
                    <BedListUI
                      bedList={bedList}
                      bedStates={bedStates}
                      userData={userData}
                      bedClick={bedClick}
                      BedEcgBtnClick={BedEcgBtnClick}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <PatientDroppable patientList={patientList} />
          </DragDropContext>
        </div>
      </div>
      {isOpenModal && (
        <BedInfo open={isOpenModal} setModalOpen={setOpenModal}></BedInfo>
      )}
    </>
  );
};
