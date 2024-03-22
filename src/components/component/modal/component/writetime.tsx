import {Box, Typography} from "@mui/material";
import { ButtonChartBpm } from "../body/bodygraph/ChartButton";
import { useEffect, useState } from "react";
import { dayGubunButtonModal, graphModal, writetimeButtonModal } from "../../../../axios/interface/graphModal";
import { calculTime, compareToWritetime, getYearMonth, getWritetimeButtomValue, replaceYear, selectWeek, 
    getYear, compareDay, compareMonth, compareYear } from "../controller/modalController";
import { bpmGraphActions, barGraphActions, writetimeGraphActions } from "../../../createslice/createslices";
import { getArr, getBpm, getCalStep } from "../data/data";
import { useDispatch } from "react-redux";
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 윤년 판단 플러그인
import 'dayjs/locale/ko'; // 한국어 가져오기

dayjs.extend(isLeapYear); // 플러그인 등록
dayjs.locale('ko'); // 언어 등록

type Props = {
    iconSelect:graphModal
    clickWritetimeButton:writetimeButtonModal
    clickDayGubunButton: dayGubunButtonModal
    eq:string
    startTime:string
}

export const Writetime = ({iconSelect,clickWritetimeButton,clickDayGubunButton,eq,startTime}:Props) => {    
    const [text,setText] = useState(startTime)
    const [disabled,setDisabled] = useState(true)
    const [originalWritetime,setOriginalWritetime] = useState(startTime)
    const GraphValue = useDispatch()

    const setValue = (id:string,plusDate:string[]) => {
        if(id == "plus"){            
            setOriginalWritetime(plusDate[1])      
        }else{    
            setOriginalWritetime(plusDate[0])          
        }
    }

    const writetimeButtonIconSelect = (id:string) => {
        let plusDate:string[] = [] 
        switch(true){
            case clickDayGubunButton.week:
                if(!compareDay(id,startTime,originalWritetime)){                    
                    plusDate = calculTime(originalWritetime,-7,7,'YYYY-MM-DD','days')
                    setDisabled(false)
                    setValue(id,plusDate)
                }else{
                    setDisabled(true)
                }                
                break;
            case clickDayGubunButton.month:
                if(!compareMonth(id,startTime,originalWritetime)){
                    plusDate = calculTime(originalWritetime,-1,1,'YYYY-MM-DD','month')
                    setDisabled(false)                                
                    setValue(id,plusDate)
                }else{
                    setDisabled(true)
                }
                break;
            case clickDayGubunButton.year:
                if(!compareYear(id,startTime,originalWritetime)){
                    plusDate = calculTime(originalWritetime,-1,1,'YYYY-MM-DD','year')
                    setDisabled(false)                                
                    setValue(id,plusDate)
                }else{
                    setDisabled(true)
                }
                break;
            default :            
                plusDate = calculTime(originalWritetime,-1,1,'YYYY-MM-DD','day')
                setValue(id,plusDate)
                break;
        } 
    }

    const getWritetime = async(id:string) => {
        let plusDate:string[] = []        
        switch(true){
            case iconSelect.pulse :
                writetimeButtonIconSelect(id)
                break;
            case iconSelect.cal :
                writetimeButtonIconSelect(id)
                break;
            case iconSelect.step :
                writetimeButtonIconSelect(id)
                break;
            default :
                plusDate = calculTime(originalWritetime,-1,1,'YYYY-MM-DD','day')
                setValue(id,plusDate)
                break;
        }             
    }    

    const setEffectFunc = () => {
        setDisabled(compareToWritetime(startTime,originalWritetime,true))
        // getTimeChangeFromButton(new Date(originalWritetime)) 
        getTimeChangeFromButton_test(originalWritetime)
    }

    useEffect(()=>{
        const today = startTime
        if(originalWritetime == today){
            setEffectFunc()   
        }else{
            setOriginalWritetime(today)
        }
    },[iconSelect])

    useEffect(()=>{
        setEffectFunc()
    },[originalWritetime,clickWritetimeButton,clickDayGubunButton])    


    const bpm_hrv = async(writetime:string) => {
        switch(true){
            case clickWritetimeButton?.days2 :
                const time = calculTime(writetime,-1,1,'YYYY-MM-DD','day')
                GraphValue(bpmGraphActions.value(await getBpm(eq,time[0],time[1])))
                setText(getWritetimeButtomValue(writetime,1))               
                break;
            case clickWritetimeButton?.days3 :   
                const times = calculTime(writetime,-2,1,'YYYY-MM-DD','day')
                GraphValue(bpmGraphActions.value(await getBpm(eq,times[0],times[1])))
                setText(getWritetimeButtomValue(writetime,2))                                   
                break;
            default :
                const timeOne = calculTime(writetime,0,1,'YYYY-MM-DD','day')   
                console.log(timeOne)              
                GraphValue(bpmGraphActions.value(await getBpm(eq,writetime,timeOne[1])))
                setText(writetime) 
                break;
        }
    }

    const getWeek = async(writetime:string) => {        
            const currentWeek = selectWeek(writetime)
             const firstDay =  currentWeek[0]
             const lastDay =   currentWeek[currentWeek.length - 1]
             const endDate = calculTime(lastDay,0,1,'YYYY-MM-DD','day')[1]
             await pulseCalStepSelectData(eq,firstDay,endDate,10)             
             const setFirstDay = replaceYear(firstDay)           
             const setLastDay = replaceYear(lastDay)             
             setText(`${setFirstDay} ~ ${setLastDay}`)
    }

    const pulseCalStepSelectData = async(eq:string,startDate:string,endDate:string,len:number) => {
        switch(true){
            case iconSelect.pulse :
                return GraphValue(barGraphActions.value(await getArr(eq,startDate,endDate,len)))
            default :
                return GraphValue(barGraphActions.value(await getCalStep(eq,startDate,endDate,len)))
        }
    }

    const pulse = async(writetime:string) => {        
        switch(true){
            case clickDayGubunButton.week:
                console.log(writetime)
               await getWeek(writetime)
             break;
            case clickDayGubunButton.month:
               const getYM = getYearMonth(writetime,0)                      
               const getNextMonth = getYearMonth(writetime,1)
               await pulseCalStepSelectData(eq,`${getYM}-01`,`${getNextMonth}-01`,10)
               setText(getYM)   
               break;
            case clickDayGubunButton.year:
                const Y = getYear(writetime)
                await pulseCalStepSelectData(eq,`${Y}-01-01`,`${Y}-12-31`,7)
                setText(Y)   
                break;
            default :
            const time = calculTime(writetime,0,1,'YYYY-MM-DD','day')
            await pulseCalStepSelectData(eq,writetime,time[1],13)
            setText(writetime)
            break;
        }        
    }

    const gubunIconButton = async(writetime:string) => {
        switch(true){
            case iconSelect.pulse :
                pulse(writetime)
                break;
            case iconSelect.cal :
                pulse(writetime)
                break;
            case iconSelect.step :
                pulse(writetime)
                break;
            default :
                await bpm_hrv(writetime)
                break;
        }        
    }      

    const getTimeChangeFromButton_test = async(time:string) => {                          
        GraphValue(writetimeGraphActions.value(time))                        
        gubunIconButton(time)           
        setOriginalWritetime(time)        
}

    const getHandler = async(id:string,bool:boolean) => {        
       await getWritetime(id)
        setDisabled(bool)
       
    }

    const writetimeHandler = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = e?.currentTarget?.id 
        if(id == "plus"){
            if(!compareToWritetime(startTime,originalWritetime)){
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
            <Typography sx={{width:110,textAlign:'center',fontWeight:'bold',marginLeft:7,marginRight:7,":hover":{cursor:'default'}}}>
                {text}
            </Typography>            
            <ButtonChartBpm id="plus" disabled={disabled} bgColor="#a8a7a7" Handler={(e)=>writetimeHandler(e)} front={true}/>            
        </Box>        
    );
}