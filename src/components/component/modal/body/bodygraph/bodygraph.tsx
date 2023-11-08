import { Box} from "@mui/material";
import { getClickGraph, getClickWriteimteButton } from "../../controller/modalController";
import { graphModal, writetimeButtonModal } from "../../../../../axios/interface/graphModal";
import { useState } from "react";
import { BodyGraphTopBody } from "./bodygraphtopbody";
import { BpmChart } from "./bpmChart";
import { Writetime } from "../../component/writetime";
import { WritetimeButton } from "./writetimeButton";
import { BodyGraphBottom } from "./bodygraphBottom";
import { BarCharts } from "./barChart";

type Props = {
    eq:string
}

export const BodyGraph = ({eq}:Props) => {    
    const [clickGraph,setClickGraph] = useState<graphModal>({bpm:true,pulse:false,hrv:false,cal:false,step:false})
    const [clickWritetimeButton,setClickWritetimeButton] = useState<writetimeButtonModal>({today:true,days2:false,days3:false}) 

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

    const getGraphBodyUI = (iconSelect:graphModal) => {
        switch(true){
          case iconSelect.pulse:
              return (
                <BarCharts clickWritetimeButton={clickWritetimeButton}/>
              );
          case iconSelect.hrv:
            return (
                <>
                <BpmChart clickWritetimeButton={clickWritetimeButton} bpm={false}/>
                <WritetimeButton  onClick={(e)=>writetimeButtonHandler(e)} clickWritetimeButton={clickWritetimeButton}/>
                </>
                    
            );
        
          case iconSelect.cal:
            return (
                <Box>
                
                </Box>
            );
        case iconSelect.step:
            return (
                <Box>
                
                </Box>
            );
          default :          
            return (
                <>
                    <BpmChart clickWritetimeButton={clickWritetimeButton} bpm={true}/>
                    <WritetimeButton  onClick={(e)=>writetimeButtonHandler(e)} clickWritetimeButton={clickWritetimeButton}/>
                </>
            );
        }
      }

      const getGraphBottomUI = (iconSelect:graphModal) => {
        switch(true){
          case iconSelect.pulse:
              return (
                <Box>
                
              </Box>
              );
          case iconSelect.hrv:
            return (
                <BodyGraphBottom clickWritetimeButton={clickWritetimeButton} bpm={false}/>
            );
        
          case iconSelect.cal:
            return (
                <Box>
                
                </Box>
            );
        case iconSelect.step:
            return (
                <Box>
                
                </Box>
            );
          default :          
            return (
                <>
                    <BodyGraphBottom clickWritetimeButton={clickWritetimeButton} bpm={true}/>
                </>
            );
        }
      }
    

    return (
        <Box sx={{height:625,marginTop:2}}>

            <BodyGraphTopBody onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => iconClick(e)} graphIcon = {clickGraph}/>
              
            {(getGraphBodyUI(clickGraph))}  

            <Writetime iconSelect={clickGraph} clickWritetimeButton={clickWritetimeButton} eq={eq}/>

            {getGraphBottomUI(clickGraph)}

        </Box>
    );
}