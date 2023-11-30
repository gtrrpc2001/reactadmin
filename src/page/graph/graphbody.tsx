import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { UserList } from "./userList";
import { GraphDatePicker } from "./datepicker";
import { getGraphBpmHrvArrData } from "../../data/graph";
import { Graphs } from "./graphBpmHrvArr";
import { GraphKindButton } from "./graphDataKindButton";
import { graphKindButton } from "../../axios/interface/graph";
import { getCalendarTime } from "../../func/func";
import { calculTime, getClickGraphKindButton } from "../../components/component/modal/controller/modalController";
import { getCalStep } from "../../components/component/modal/data/data";

type Props = {
    names:{eq:string,eqname:string}[]
    marginTop:number
}

export const GraphBody = ({names,marginTop}:Props) => {
    const [list,setList] = useState<{eq:string,eqname:string}[]>([])
    const [id,setId] = useState<string>('')
    const [data,setData] = useState<any[]>([])
    const [kindButton,setKindButton] = useState<graphKindButton>({bpm_hrv_arr:true,cal_step:false,ecg:false})
    const [writetime,setWritetime] = useState<string>('')

    useEffect(()=>{
        setList(names)
    },[names])    

    async function getData(id:string,time:string,kindButton:graphKindButton,setData:React.Dispatch<React.SetStateAction<any[]>>)
    {
        try{
            if(id != '' && time != ''){
                let result
                let v:any[] = []
                const calTime = calculTime(time,1)
                switch(true){
                    case kindButton.ecg :
                        
                        break;
                    case kindButton.cal_step :
                        result = await getCalStep(id,time,calTime[1],13)
                        v = result?.map((d)=>{
                            return {step:d.step,distanceKM:d.distanceKM,cal:d.cal,calexe:d.calexe,
                            time:d.writetime
                            }
                        })
                        break;
                    default :                                                
                        result = await getGraphBpmHrvArrData(id,time,calTime)                        
                        v = result?.map((d)=>{
                             return {bpm:d.bpm,hrv:d.hrv,arr:d.count,time:d.writetime?.split(' ')[1]}
                         })
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
    } 

    return (
        <Box sx={{display:'flex',alignItems:'center',marginTop:marginTop}}>
            <UserList list={list} handler={handler} id={id} width={300} height={400}/>   
            <Box>
                <Box sx={{paddingLeft:5,paddingBottom:2,display:'flex',alignItems:'center'}}>                            
                    <GraphDatePicker onChange={pickerChange}  width={170} height={50} />
                    <GraphKindButton onClick={ButtonHandler} kindButton={kindButton} fristItemWidth={230} secondItemWidth={130} thirdItemWidth={100}/>                            
                </Box>

                <Graphs data={data} width={1300} height={340} kind={kindButton}/>
            </Box>
        </Box>
    );
}
