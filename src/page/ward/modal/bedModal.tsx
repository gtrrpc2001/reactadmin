import UiModal from "@mui/material/Modal";
import { ModalDefaultType } from "../../../axios/interface/modalvalues";
import { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { mainBoxstyle } from "../../../components/component/modal/modal";

export const BedInfo = ({
  open,
  setModalOpen,
}: PropsWithChildren<ModalDefaultType>) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <UiModal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mainBoxstyle("50%","10%")}>
            
        </Box>
      </UiModal>
    </div>
  );
};
