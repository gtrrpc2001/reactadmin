import {Box, Typography} from "@mui/material";
import { ButtonChartBpm } from "../body/bodygraph/ChartButton";
import { useEffect, useState } from "react";
import { getTime } from "../../../../func/func";
import { graphModal, writetimeButtonModal } from "../../../../axios/interface/graphModal";
import { calculTime, compareToWritetime, getWritetimeButtomValue, getWritetimeValue } from "../controller/modalController";
import { bpmGraphActions, writetimeGraphActions } from "../../../createslice/createslices";
import { getBpm } from "../data/data";
import { useDispatch } from "react-redux";

type Props = {
    iconSelect:graphModal
    clickWritetimeButton:writetimeButtonModal
    eq:string
}

export const Writetime = ({iconSelect,clickWritetimeButton,eq}:Props) => {
    const [text,setText] = useState(getTime(false))
    const [disabled,setDisabled] = useState(true)
    const [originalWritetime,setOriginalWritetime] = useState(getTime(false))
    const GraphValue = useDispatch()

    const getWritetime = async(id:string) => {        
        const plusDate = calculTime(originalWritetime,1)
        if(id == "plus"){            
            setOriginalWritetime(plusDate[1])      
        }else{    
            setOriginalWritetime(plusDate[0])          
        }
    }    

    useEffect(()=>{
        setDisabled(compareToWritetime(originalWritetime,true))
        getTimeChangeFromButton(new Date(originalWritetime))
    },[originalWritetime,clickWritetimeButton,iconSelect])    


    const bpm_hrv = async(writetime:string) => {
        switch(true){
            case clickWritetimeButton?.days2 :
                const time = calculTime(writetime,1)                                
                GraphValue(bpmGraphActions.value(await getBpm(eq,time[0],time[1])))
                setText(getWritetimeButtomValue(writetime,1))               
                break;
            case clickWritetimeButton?.days3 :   
                const times = calculTime(writetime,2)
                GraphValue(bpmGraphActions.value(await getBpm(eq,times[0],times[1])))
                setText(getWritetimeButtomValue(writetime,2))                                   
                break;
            default :
                const timeOne = calculTime(writetime,0)                     
                GraphValue(bpmGraphActions.value(await getBpm(eq,writetime,timeOne[1])))
                setText(writetime) 
                break;
        }
    }

    const gubunIconButton = async(writetime:string) => {

        switch(true){
            case iconSelect.pulse :

            case iconSelect.cal,iconSelect.step :

            default :
                await bpm_hrv(writetime)
        }        
    }

    const getTimeChangeFromButton = async(day:Date) => {
        if(!Number.isNaN(day.getDate())){            
            const writetime = getWritetimeValue(day)
            GraphValue(writetimeGraphActions.value(writetime))
            setOriginalWritetime(writetime)            
            gubunIconButton(writetime)           
        }else{
            gubunIconButton(originalWritetime)            
        }
    }   

    const getHandler = async(id:string,bool:boolean) => {        
       await getWritetime(id)
        setDisabled(bool)
       
    }

    const writetimeHandler = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = e?.currentTarget?.id 
        if(id == "plus"){
            if(!compareToWritetime(originalWritetime)){
                getHandler('plus',false)                
            }else{
                getHandler('plus',true)
            }
        }else{
            getHandler('minus',false)            
        }
    }

    return (
        <Box sx={{height:40 , display:'flex',alignItems:'center',justifyContent:'center'}}>
            <ButtonChartBpm id="minus"  bgColor="#a8a7a7" Handler={(e)=>writetimeHandler(e)} front={false}/>            
            <Typography sx={{fontWeight:'bold',marginLeft:7,marginRight:7}}>
                {text}
            </Typography>            
            <ButtonChartBpm id="plus" disabled={disabled} bgColor="#a8a7a7" Handler={(e)=>writetimeHandler(e)} front={true}/>            
        </Box>        
    );
}