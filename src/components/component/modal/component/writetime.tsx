import {Box, Typography} from "@mui/material";
import { ButtonChartBpm } from "../body/bodygraph/ChartButton";
import { useEffect, useState } from "react";
import { getTime } from "../../../../func/func";
import { writetimeButtonModal } from "../../../../axios/interface/graphModal";
import { calculTime, compareToWritetime, getWritetimeButtomValue, getWritetimeValue } from "../controller/modalController";
import { bpmGraphActions, writetimeGraphActions } from "../../../createslice/createslices";
import { getBpm } from "../data/data";
import { useDispatch } from "react-redux";

type Props = {
    clickWritetimeButton?:writetimeButtonModal
    eq:string
}

export const Writetime = ({clickWritetimeButton,eq}:Props) => {
    const [text,setText] = useState(getTime(false))
    const [disabled,setDisabled] = useState(true)
    const [day , setDay] = useState<Date>(new Date())
    const [originalWritetime,setOriginalWritetime] = useState(getTime(false))
    const GraphValue = useDispatch()

    const getWritetime = async(id:string,date:number) => {        
        if(id == "plus"){
            var next:Date
            if(Number.isNaN(date)){
                var now = new Date(originalWritetime)
                var nowDate = now.getDate()
                next = new Date(now.setDate(nowDate + 1))
            }else{                
                next = new Date(day.setDate(date + 1))            
            }
           await getTimeChangeFromButton(next)
        }else{
            var yesterday:Date            
            if(Number.isNaN(date)){
                var now = new Date(originalWritetime)
                var nowDate = now.getDate()
                yesterday = new Date(now.setDate(nowDate - 1))
                console.log(yesterday)
            }else{
                yesterday = new Date(day.setDate(date - 1));  
            }
            await getTimeChangeFromButton(yesterday)
            
        }
    }

    const getDay = ():string => {        
        switch(true){
            case clickWritetimeButton?.today :
                return text            
            default :                           
                return originalWritetime
        }
    }

    useEffect(()=>{
        setDay(new Date(getDay()))  
        getTimeChangeFromButton(day)
    },[clickWritetimeButton])    

    const getTimeChangeFromButton = async(day:Date) => {
        if(!Number.isNaN(day.getDate())){
            const writetime = getWritetimeValue(day)
            GraphValue(writetimeGraphActions.value(writetime))
            setOriginalWritetime(writetime)
            switch(true){
                case clickWritetimeButton?.days2 :
                    const time = calculTime(writetime,1)                
                    GraphValue(bpmGraphActions.value(await getBpm(eq,time[0],time[1])))                
                    setText(getWritetimeButtomValue(day,writetime,1)) 
                    break;
                case clickWritetimeButton?.days3 :                    
                    const times = calculTime(writetime,2)
                    GraphValue(bpmGraphActions.value(await getBpm(eq,times[0],times[1])))
                    setText(getWritetimeButtomValue(day,writetime,2)) 
                    break;
                default :
                    const timeOne = calculTime(writetime,0)                     
                    GraphValue(bpmGraphActions.value(await getBpm(eq,writetime,timeOne[1])))
                    setText(writetime) 
                    break;
            }
        }
    }   

    const getHandler = async(id:string,date:number,bool:boolean) => {        
       await getWritetime(id,date)
        setDisabled(bool)
    }

    const writetimeHandler = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = e?.currentTarget?.id
        const date = day.getDate() 
        if(id == "plus"){
            if(!compareToWritetime(originalWritetime)){
                getHandler('plus',date,false)                
            }else{
                getHandler('plus',date,true)
            }
        }else{
            getHandler('minus',date,false)            
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