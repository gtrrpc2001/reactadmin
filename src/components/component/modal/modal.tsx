import React, { PropsWithChildren, useState} from "react";
import UiModal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useSelector } from "react-redux";
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
import { BodyGraph } from "./body/bodygraph/bodygraph";
import { BodyPulse } from "./body/bodypulse/bodypulse";
import { BodyProfile } from "./body/bodyprofile/bodyprofile";


interface ModalDefaultType {
    open:boolean
    setModalOpen:(value: React.SetStateAction<boolean>) => void
  }

  export const Modal = ({open,setModalOpen,children}:PropsWithChildren<ModalDefaultType>) =>{   
    const values = useSelector<RootState,any>(state => state.cellValues)
    const data:historyLast[] = useSelector<RootState,any>(state => state.historylast) 
    const getProfile:profileModal = useSelector<RootState,any>(state => state.profile)   
    const [footerBtn , setFooterBtn] = useState<footerIcon>({home:true,graph:false,pulse:false,profile:false})
    const modalList = getValues(data,values.eq)    
    const eq = values.eq   
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

  const footerClick = async (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {    
    const id = e?.currentTarget?.id
    let iconClick:footerIcon = getClickFooter(id) 
    setFooterBtn(iconClick)
  }

  const getModalUI = (footerSelect:footerIcon) => {
    switch(true){
      case footerSelect.graph:
          return (
            <BodyGraph profile={getProfile} eq={eq}/>
          );
      case footerSelect.profile:
        return (
          <BodyProfile cellValue={values} modalList={modalList} profile={getProfile}/>
        );
    
      case footerSelect.pulse:
        return (
          <BodyPulse eq={eq}/>
        );
      default :
        return (
          <ModalHome open={open} modalList={modalList} values={values} getProfile={getProfile}/>
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
            
            <ModalHeader values={modalList}/>         

              {(getModalUI(footerBtn))}                           
            
              <Footer footerClick={footerBtn} onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => footerClick(e)}/>
              
            </Box>
          </UiModal>
        </div>
    );

  }