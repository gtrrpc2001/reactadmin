import { Box } from "@mui/material";
import { WritetimeList } from "./writetimeList";
import { WritetimeButton } from "./writetimeButton";
import { calculTime, compareToWritetime } from "../../controller/modalController";
import { useState } from "react";
import { PulseChart } from "./pulseChart";

type Props = {
    eq:string
    startTime:string
}
export const BodyPulse = ({eq,startTime}:Props) => {
    const [writetime,setWritetime] = useState(startTime)
    const [currentTime,setCurrentTime] = useState('')
    const [disabled,setDisabled] = useState(true)
    const [writetimes,setWritetimes] = useState<any[]>([])
    const [id,setId] = useState<string>('')

    const setValue = (id:string) => {
       const plusDate = calculTime(writetime,1)
        if(id == "plus"){            
            setWritetime(plusDate[1])      
        }else{    
            setWritetime(plusDate[0])          
        }
    }
    
    const writetimeHandler = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = e?.currentTarget?.id 
        if(id == "plus"){
            if(!compareToWritetime(writetime)){
                setValue('plus')   
                setDisabled(false)              
            }else{
                setValue('plus')
                setDisabled(true)
            }
        }else{
            setValue('minus')   
            setDisabled(false)         
        }
    }

    const listItemHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {            
        const nowId = e.currentTarget.id
        const {writetime} = writetimes?.filter((value,index) => {
                                    if(index + 1 == +nowId) 
                                        return value
                            })[0]       
        setCurrentTime(writetime)                    
        setId(nowId)        
    }

    return (
        <Box sx={{height:625}}>
            <PulseChart eq={eq} time={currentTime}/>
            <WritetimeButton writetime = {writetime} setTime={setWritetime} disabled={disabled} writetimeHandler={writetimeHandler}/>
            <WritetimeList writetime = {writetime} id={id} list={writetimes} setList={setWritetimes} handler={listItemHandler}  eq={eq}/>
        </Box>
    );
}