import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Room.scss";
// import { BedInfo } from "../modal/bedModal";
import { useEffect, useRef, useState } from "react";
import { historyLast } from "../../../axios/interface/history_last";
import { getHistory, getProfile } from "../../../axios/api/serverApi";
import React from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { PatientDroppable } from "../patient/patientDroppable";
import { BedListUI } from "../bed/bedList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Modal } from "../../../components/component/modal/modal";
import { calculTime } from "../../../components/component/modal/controller/modalController";
import {
  cellActions,
  listActions,
  profileActions,
} from "../../../components/createslice/createslices";

type Props = {
  setRoomVisible: React.Dispatch<React.SetStateAction<boolean>>;
  roomId: number;
};

const bedList = [
  "침대 1",
  "침대 2",
  "침대 3",
  "침대 4",
  "침대 5",
  "침대 6",
  "침대 7",
  "침대 8",
  "침대 9",
  "침대 10",
];

const arraysEqual = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;
  return true;
};

export const Room = ({ setRoomVisible }: Props) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [bedStates, setBedStates] = useState<{ [key: string]: boolean }>({});
  const getTableData = useSelector<RootState, any>(
    (state) => state.historylast
  );
  const [data, setData] = useState<historyLast[]>(getTableData);
  const eqSelector = useSelector<RootState, string>((state) => state.eq);
  const [patientList, setPatientList] = useState<string[]>([]);
  const [bedClickEq, setBedClickEq] = useState<string>("");
  const newPatientList = useRef<string[]>([]);
  const firstData = useRef<historyLast[]>([]);
  const Dispatch = useDispatch();

  const [assignedPatients, setAssignedPatients] = useState<string[]>(
    Array(bedList.length).fill(null)
  );

  const bedClick = async (_name: string, eq: string) => {
    if (data.length > 0) {
      const user = data.filter((d) => d.eq === eq);
      if (user) {
        const oneUser = user[0];
        const changtime = oneUser?.changeTime?.split(" ")[0];
        const battery = oneUser.battery;
        const startDate = oneUser.writetime?.split(" ")[0];
        const eqname = oneUser.eqname;
        const timezone = oneUser.timezone;
        const cellVlaue = {
          eq,
          eqname,
          timezone,
          startDate,
          changtime,
          battery,
        };
        const times = calculTime(startDate, -1, 1, "YYYY-MM-DD", "days");
        const Profile = await getProfile(
          `/mslecgarr/arrCnt?eq=${oneUser.eq}&startDate=${startDate}&endDate=${times[1]}`
        );
        Dispatch(profileActions.profile(Profile));
        Dispatch(cellActions.cellValues(cellVlaue));
        setBedClickEq(eq);
        setOpenModal(!isOpenModal);
      }
    }
  };

  const BedEcgBtnClick = (key: string) => {
    setBedStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

  const getPatientListMemo = (newList: string[]) => {
    if (!arraysEqual(patientList, newList)) {
      if (patientList.length < 1) {
        setPatientList(newList);
      } else {
        console.log("여기가 1개씩");
        setPatientList((list) => {
          const updatedList = [...list];
          newList.forEach((newPatient) => {
            if (!updatedList.includes(newPatient)) {
              updatedList.push(newPatient);
            }
          });
          return list;
        });
      }
    }
  };

  useEffect(() => {
    firstData.current = data;
    //db에서 room 번호 bed 번호 받아오기
  }, [patientList]);

  useEffect(() => {
    getPatientListMemo(newPatientList.current);
  }, [newPatientList.current]);

  useEffect(() => {
    async function getInfoList() {
      try {
        const getData: historyLast[] = await getHistory(
          `/mslLast/webTable?eq=${eqSelector}`
        );

        if (getData?.length != 0 && !String(getData).includes("result")) {
          setData(getData);
        }

        newPatientList.current = getData.map((item) => item.eqname);
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
    //   // let timer: NodeJS.Timeout | null = null;

    //   // if (Object.values(bedStates).some((state) => state)) {
    //   //   timer = setInterval(async () => {
    //   //     await getInfoList();
    //   //   }, 1000);
    //   // } else if (timer) {
    //   //   clearInterval(timer);
    //   // }

    //   // return () => {
    //   //   if (timer) {
    //   //     clearInterval(timer);
    //   //   }
    //   // };
  }, [bedStates]);

  useEffect(() => {
    async function getInfoList() {
      try {
        const getData: historyLast[] = await getHistory(
          `/mslLast/webTable?eq=${bedClickEq}`
        );

        if (getData?.length != 0 && !String(getData).includes("result")) {
          return getData;
        }
        return [];
      } catch (E) {
        console.log(E);
        return [];
      }
    }

    const timer = setInterval(async () => {
      if (isOpenModal) {
        const getData = await getInfoList();
        Dispatch(listActions.listHistory(getData));
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isOpenModal]);

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
                      userData={data}
                      bedClick={bedClick}
                      BedEcgBtnClick={BedEcgBtnClick}
                      cfData={firstData.current}
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
        <Modal open={isOpenModal} setModalOpen={setOpenModal}></Modal>
        // <BedInfo open={isOpenModal} setModalOpen={setOpenModal}></BedInfo>
      )}
    </>
  );
};
