import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import UiModal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { historyLast } from "../../../axios/interface/history_last";
import "./modal.scss";
import "animate.css";
import { ModalHeader } from "./header/modalHeader";
import {
  getClickFooter,
  getDate,
  getValues,
} from "./controller/modalController";
import { profileModal } from "../../../axios/interface/profileModal";
import { Footer } from "./footer/footer";
import { ModalHome } from "./body/bodyhome/modalHome";
import { footerIcon } from "../../../axios/interface/footerIcon";
import { BodyGraph } from "./body/bodygraph/bodygraph";
import { BodyPulse } from "./body/bodypulse/bodypulse";
import { BodyProfile } from "./body/bodyprofile/bodyprofile";
import { modalValues } from "../../../axios/interface/modalvalues";
import { todayArrCountAction } from "../../createslice/createslices";

interface ModalDefaultType {
  open: boolean;
  setModalOpen: (value: React.SetStateAction<boolean>) => void;
}

export const Modal = ({
  open,
  setModalOpen,
  children,
}: PropsWithChildren<ModalDefaultType>) => {
  const dispatch = useDispatch();
  const values = useSelector<RootState, any>((state) => state.cellValues);
  const data: historyLast[] = useSelector<RootState, any>(
    (state) => state.modalData
  );
  const getProfile: profileModal = useSelector<RootState, any>(
    (state) => state.profile
  );
  const [modalList, setModalList] = useState<modalValues>(
    getValues(data, values.eq)
  );

  const [footerBtn, setFooterBtn] = useState<footerIcon>({
    home: true,
    graph: false,
    pulse: false,
    profile: false,
  });

  useEffect(() => {
    setModalList(getValues(data, values.eq));
  }, [data]);

  const refreshArrCount = () => {
    dispatch(todayArrCountAction.todayCount(modalList.arrCnt));
  };

  useEffect(() => {
    refreshArrCount();
  }, [modalList.arrCnt]);

  const eq = values.eq;

  const closeModal = () => {
    setModalOpen(false);
  };

  const mainBoxstyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    height: 800,
    bgcolor: "background.paper",
    border: 5,
    spacing: 0,
    borderRadius: 12,
    boxShadow: 24,
    paddingInline: 0,
    paddingBlock: 0,
    display: "absolute",
  };

  const footerClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const id = e?.currentTarget?.id;
    let iconClick: footerIcon = getClickFooter(id);
    setFooterBtn(iconClick);
  };

  const getModalUI = (footerSelect: footerIcon) => {
    const startDate = values.startDate;
    const koreaTime = values.changtime;
    switch (true) {
      case footerSelect.graph:
        return <BodyGraph profile={getProfile} eq={eq} startTime={startDate} />;
      case footerSelect.profile:
        return (
          <BodyProfile
            cellValue={values}
            modalList={modalList}
            profile={getProfile}
          />
        );

      case footerSelect.pulse:
        return (
          <BodyPulse
            eq={eq}
            startTime={getDate(modalList.writetime)}
            koreaTime={koreaTime}
          />
        );
      default:
        return (
          <ModalHome
            open={open}
            modalList={modalList}
            values={values}
            getProfile={getProfile}
          />
        );
    }
  };

  return (
    <div>
      <UiModal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mainBoxstyle}>
          <ModalHeader values={modalList} battery={values.battery} />

          {getModalUI(footerBtn)}

          <Footer
            footerClick={footerBtn}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              footerClick(e)
            }
          />
        </Box>
      </UiModal>
    </div>
  );
};
