import React, { PropsWithChildren, useState} from "react";
import UiModal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { historyLast } from "../../../axios/interface/history_last";
import './modal.scss'
import 'animate.css';
import { ModalHeader } from "./header/modalHeader";
import {  getClickFooter, getValues } from "./controller/modalController";
import { profileModal } from "../../../axios/interface/profileModal";
import { Footer } from "./footer/footer";
import { ModalHome } from "./modalHome";
import { footerIcon } from "../../../axios/interface/footerIcon";
import { bpmGraphActions } from "../../createslice/createslices";
import { getBpm } from "./data/data";
import { BodyGraph } from "./body/bodygraph/bodygraph";


interface ModalDefaultType {
    open:boolean
    setModalOpen:(value: React.SetStateAction<boolean>) => void
  }

  export const Modal = ({open,setModalOpen,children}:PropsWithChildren<ModalDefaultType>) =>{   
    const values = useSelector<RootState,any>(state => state.cellValues)
    const data:historyLast[] = useSelector<RootState,any>(state => state.historylast) 
<<<<<<< HEAD
    const getProfile:profileModal = useSelector<RootState,any>(state => state.profile)   
=======
    const getProfile:profileModal = useSelector<RootState,profileModal>(state => state.profile)
>>>>>>> d0516a432e869e3f844b0417a19622bf468e735d
    const [footerBtn , setFooterBtn] = useState<footerIcon>({home:true,graph:false,pulse:false,profile:false})
    const bpmGraphValue = useDispatch()
    const modalList = getValues(data,values.eq)    
<<<<<<< HEAD
    const eq = values.eq   
=======
    const bpm = modalList.bpm
    const arrCnt = modalList.arrCnt    
>>>>>>> d0516a432e869e3f844b0417a19622bf468e735d
    const closeModal = () => {      
        setModalOpen(false);
    }; 

  const mainBoxstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350, 
    height:800,   
    bgcolor: 'background.paper',
    border: 5,
    spacing:0, 
    borderRadius:12,   
    boxShadow: 24,
    paddingInline:0,
    paddingBlock:0,
    display:'absolute',
  };    

<<<<<<< HEAD
  const footerClick = async (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {    
    const id = e?.currentTarget?.id
    let iconClick:footerIcon = getClickFooter(id)  
    if(iconClick.graph){
      bpmGraphValue(bpmGraphActions.value(await getBpm(eq)))
    }
=======
  const footerClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {    
    const id = e?.currentTarget?.id
    let iconClick:footerIcon = getClickFooter(id)  
>>>>>>> d0516a432e869e3f844b0417a19622bf468e735d
    setFooterBtn(iconClick)
  }

  const getModalUI = (footerSelect:footerIcon) => {
    switch(true){
      case footerSelect.graph:
          return (
            <BodyGraph eq={eq}/>
          );
      case footerSelect.profile:
        return (
          <Box sx={{height:641}}>
          </Box>
        );
    
      case footerSelect.pulse:
        return (
          <Box sx={{height:641}}>
          </Box>
        );
      default :
        return (
          <ModalHome modalList={modalList} values={values} getProfile={getProfile}/>
        );
    }
  }
  
    return (    
        <div>
          <UiModal
            open={open}                        
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"         
            >
            <Box sx={mainBoxstyle}>
            
              <ModalHeader />        

              {(getModalUI(footerBtn))}                           
            
              <Footer footerClick={footerBtn} onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => footerClick(e)}/>
              
            </Box>
          </UiModal>
        </div>
    );

  }
