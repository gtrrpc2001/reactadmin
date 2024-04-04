import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { UserList } from "./userList";
import { GraphDatePicker } from "./datepicker";
import { getGraphBpmHrvArrData, getGraphEcgValue } from "../../data/graph";
import { Graphs } from "./graphBpmHrvArr";
import { GraphKindButton } from "./graphDataKindButton";
import { graphKindButton } from "../../axios/interface/graph";
import { getCalendarTime, getWritetimeSelectHour_Min } from "../../func/func";
import { calculTime, getClickGraphKindButton } from "../../components/component/modal/controller/modalController";
import { getCalStep } from "../../components/component/modal/data/data";

type Props = {
    names:{eq:string,eqname:string}[]
    marginTop:number
}

export const GraphBody = ({names,marginTop}:Props) => {
    const refList = useRef(names)
    const [id,setId] = useState<string>('')
    const [data,setData] = useState<any[]>([])
    const [kindButton,setKindButton] = useState<graphKindButton>({bpm_hrv_arr:true,cal_step:false,ecg:false})
    const [writetime,setWritetime] = useState<string>('')
    const [ecgTime,setEcgTime] = useState<string>('') 
    const prevEcgTime = useRef<string>('')    
    const [open,setOpen] = useState<boolean>(true)   
    
    const getCheckMaxValue = (value:number):number => {
        return (value > 180) ? 180 : value
    }

    async function getData(id:string,time:string,kindButton:graphKindButton,setData:React.Dispatch<React.SetStateAction<any[]>>)
    {
        try{
            if(id != '' && time != ''){
                let result
                let v:any[] = []
                const calTime = calculTime(time,-1,1,'YYYY-MM-DD','days')
                switch(true){
                    case kindButton.ecg :
                        setEcgTime('')
                        break;
                    case kindButton.cal_step :
                        result = await getCalStep(id,time,calTime[1],13)
                        v = result?.map((d)=>{
                            return {step:d.step,distanceKM:d.distanceKM,cal:d.cal,calexe:d.calexe,
                            time:d.writetime
                            }
                        })
                        setOpen(true)
                        break;
                    default :                                                
                        result = await getGraphBpmHrvArrData(id,time,calTime)
                        v = result?.map((d)=>{
                             return {bpm:getCheckMaxValue(d.bpm),hrv:getCheckMaxValue(d.hrv),arr:d.count,writetime:getWritetimeSelectHour_Min(d.writetime)}
                         })
                         setOpen(true)
                        break;

                }                
                setData(v)                
            }
        }catch{

        }
    }

    useEffect(()=>{       
        getData(id,writetime,kindButton,setData)
    },[id,writetime,kindButton])

    useEffect(()=>{  
        async function getEcgData(){
            if(ecgTime != ''){               
                const startTime = `${writetime} ${ecgTime}`
                const endTime = calculTime(startTime,0,10,'YYYY-MM-DD HH:mm','minute')[1] 
                const result = await getGraphEcgValue(id,startTime,endTime)                
                const v = result?.map((d)=>{
                    return {ecg:d}
                })             
                setData(v)
                setOpen(true)
            } 
        }
        getEcgData();
    },[ecgTime])

    const handler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) =>{
        const nowId = e.currentTarget.id               
        setId(nowId)
    }

    const pickerChange = (value:any) => {
        const currentTime = getCalendarTime(value)
        setWritetime(currentTime)
    }

    const ButtonHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const id = e?.currentTarget?.id    
        let iconClick:graphKindButton = getClickGraphKindButton(id) 
        setKindButton(iconClick)       
        if (!iconClick.ecg)
            setOpen(false)
    } 

    const ecgTimeListHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const nowId = e.currentTarget.id        
        if (prevEcgTime.current != nowId || (prevEcgTime.current == "" && ecgTime == "")){          
            prevEcgTime.current = nowId
            setEcgTime(nowId)
            setOpen(false)
        }
    }

    return (
        <Box sx={{display:'flex',alignItems:'center',marginTop:marginTop}}>
            <UserList nameList={refList.current} handler={handler} id={id} width={300} height={400}/>   
            <Box>
                <Box sx={{paddingLeft:5,paddingBottom:2,display:'flex',alignItems:'center'}}>                            
                    <GraphDatePicker onChange={pickerChange}  width={170} height={50} />
                    <GraphKindButton onClick={ButtonHandler} onEcgTimeClick={ecgTimeListHandler} id={ecgTime} eq={id} time={writetime} kindButton={kindButton} fristItemWidth={230}/>                            
                </Box>
                {open ? (
                        <Graphs data={data} width={1300} height={340} kind={kindButton}/>          
                    ) : (
                    <Box sx={{display:'flex',width:1300, height:350,justifyContent:'center',alignItems:'center'}}>
                        <Box sx={{textAlign:'center'}}>
                            <CircularProgress color="primary"/>                        
                            <Typography>
                                {'약5초 기다려 주세요!.'}
                            </Typography>
                        </Box>
                    </Box>             
                    )}
            </Box>
        </Box>
    );
}