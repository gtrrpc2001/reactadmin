import { Box} from "@mui/material";
import { getClickGraph } from "../../controller/modalController";
import { graphBpm, graphModal } from "../../../../../axios/interface/graphModal";
import { useState } from "react";
import { BodyGraphTopBody } from "./bodygraphtopbody";
import { BpmChart } from "./bpmChart";

type Props = {
    eq:string
}

export const BodyGraph = ({eq}:Props) => {    
    const [clickGraph,setClickGraph] = useState<graphModal>({bpm:true,pulse:false,hrv:false,cal:false,step:false})

    const getGraphBodyUI = (iconSelect:graphModal) => {
        switch(true){
          case iconSelect.pulse:
              return (
                <Box>
                
              </Box>
              );
          case iconSelect.hrv:
            return (
                <Box>
                
                </Box>
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
                <BpmChart eq={eq}/>
            );
        }
      }

    const iconClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const id = e?.currentTarget?.id
        let iconClick:graphModal = getClickGraph(id)
        setClickGraph(iconClick)
    }

    return (
        <Box sx={{height:625,marginTop:2}}>

            <BodyGraphTopBody onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => iconClick(e)} graphIcon = {clickGraph}/>
              
            {(getGraphBodyUI(clickGraph))}  
        </Box>
    );
}