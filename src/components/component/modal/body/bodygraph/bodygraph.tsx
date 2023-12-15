import { Box} from "@mui/material";
import { getClickDayGubunButton, getClickGraph, getClickWriteimteButton } from "../../controller/modalController";
import { graphModal, writetimeButtonModal,dayGubunButtonModal } from "../../../../../axios/interface/graphModal";
import { useState } from "react";
import { BodyGraphTopBody } from "./bodygraphtopbody";
import { BpmChart } from "./bpmChart";
import { Writetime } from "../../component/writetime";
import { WritetimeButton } from "./writetimeButton";
import { BodyGraphBpmBottom, BodyGraphCalStepBottom, BodyGraphPulseBottom } from "./bodygraphBottom";
import { BarCharts } from "./barChart";
import { DayGubunButton } from "./dayGubunButton";
import { profileModal } from "../../../../../axios/interface/profileModal";

type Props = {
    profile: profileModal
    eq:string
    startTime:string
}

export const BodyGraph = ({profile,eq,startTime}:Props) => {    
    const [clickGraph,setClickGraph] = useState<graphModal>({bpm:true,pulse:false,hrv:false,cal:false,step:false})
    const [clickWritetimeButton,setClickWritetimeButton] = useState<writetimeButtonModal>({today:true,days2:false,days3:false}) 
    const [clickDayGubunButton,setClickDayGubunButton] = useState<dayGubunButtonModal>({day:true,week:false,month:false,year:false})

    const iconClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const id = e?.currentTarget?.id
        let iconClick:graphModal = getClickGraph(id)
        setClickGraph(iconClick)
    }

    const writetimeButtonHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = e?.currentTarget?.id
        let iconClick:writetimeButtonModal = getClickWriteimteButton(id)
        setClickWritetimeButton(iconClick)
    }

    const dayGubunButtonHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = e?.currentTarget?.id
        let iconClick:dayGubunButtonModal = getClickDayGubunButton(id)
        setClickDayGubunButton(iconClick)
    }

    const pulse_cal_step = () => {
        return (
            <>
            <BarCharts iconSelect={clickGraph} dayGubunButtonModal={clickDayGubunButton}/>
            <DayGubunButton onClick={(e) => dayGubunButtonHandler(e)} dayClick={clickDayGubunButton}/>
            </>
        );
    }

    const bpm_hrv = (bool:boolean) => {
        return (
        <>
            <BpmChart clickWritetimeButton={clickWritetimeButton} bpm={bool}/>
            <WritetimeButton  onClick={(e)=>writetimeButtonHandler(e)} clickWritetimeButton={clickWritetimeButton}/>
        </>
        );
    }

    const getGraphBodyUI = (iconSelect:graphModal) => {
        switch(true){
          case iconSelect.pulse:
              return pulse_cal_step()
          case iconSelect.hrv:
            return bpm_hrv(false)        
          case iconSelect.cal:
            return pulse_cal_step()
        case iconSelect.step:
            return pulse_cal_step()
          default :          
            return bpm_hrv(true)
        }
      }

      const getGraphBottomUI = (iconSelect:graphModal) => {
        switch(true){
          case iconSelect.pulse:
              return (
              <BodyGraphPulseBottom clickDayGubunButton={clickDayGubunButton}/>
              );
          case iconSelect.hrv:
            return (
              <BodyGraphBpmBottom clickWritetimeButton={clickWritetimeButton} bpm={false}/>
            );
        
          case iconSelect.cal:
            return (
                <BodyGraphCalStepBottom profile={profile} step={false}/>
            );
        case iconSelect.step:
            return (
                <BodyGraphCalStepBottom profile={profile} step={true}/>
            );
          default :          
            return (
                <>
                    <BodyGraphBpmBottom clickWritetimeButton={clickWritetimeButton} bpm={true}/>
                </>
            );
        }
      }
    

    return (
        <Box sx={{height:625,marginTop:2}}>

            <BodyGraphTopBody onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => iconClick(e)} graphIcon = {clickGraph}/>
              
            {(getGraphBodyUI(clickGraph))}  

            <Writetime iconSelect={clickGraph} clickWritetimeButton={clickWritetimeButton} clickDayGubunButton={clickDayGubunButton} eq={eq} startTime={startTime}/>

            {getGraphBottomUI(clickGraph)}

        </Box>
    );
}