import { Box,Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { graphBpm, writetimeButtonModal } from "../../../../../axios/interface/graphModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import {
    LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
    Legend
} from 'recharts';
import { ButtonChartBpm } from "./ChartButton";
import { replaceYear, selectTime } from "../../controller/modalController";


type Props = {
    clickWritetimeButton:writetimeButtonModal
    bpm:boolean
}

export const BpmChart = ({clickWritetimeButton,bpm}:Props) => {
    let [Count ,setCount] = useState<number>(1)
    const [backBtn,setBackBtn] = useState<boolean>(true)
    const [nextBtn,setNextBtn] = useState<boolean>(false)
    const data:graphBpm[] = useSelector<RootState,any>(state => state.bpmGraphValue) 
    const writetime:string = useSelector<RootState,any>(state => state.writetimeGraph)
    const [lineName1,setLineName1] = useState<string>('엊그제')    
    const [lineName2,setLineName2] = useState<string>('어제')    
    const [lineName3,setLineName3] = useState<string>('오늘')    
      
    const compareLength = (value1:number,value2:number,value3:number):number => {
       const compareValue1 = (value1 > value2) ? value1 :value2
       const compareValue2 = (compareValue1 > value3) ? compareValue1 : value3
       return compareValue2
    }

    const compareValue = (value1:graphBpm[],value2:graphBpm[],value3:graphBpm[]=[]):graphBpm[] => {
        const compareValue1 = (value1.length > value2.length) ? value1 :value2
        const compareValue2 = (compareValue1.length > value3.length) ? compareValue1 : value3
        return compareValue2
     }

    const getLength = ():number => {       
        switch(true){
            case clickWritetimeButton.days2 :     
                const times:string[] = selectTime(writetime,1)                                      
                const Index = data.findIndex((el)=> {return el.writetime.includes(times[1])})
                const yesterdayIndex = Index
                const todayIndex = data.length - Index
                return (todayIndex > yesterdayIndex)? todayIndex : yesterdayIndex
            case clickWritetimeButton.days3 :
                const time:string[] = selectTime(writetime,1)            
                const idx = data?.findIndex((el)=> {return el.writetime.includes(time[0])})
                if(idx != -1){
                    const todayidx = data?.findIndex((el)=> {return el.writetime.includes(time[1])})
                    const daysago = idx
                    const yesterIndex = todayidx - idx
                    const todayIdx = data.length - todayidx 
                    return compareLength(daysago,yesterIndex,todayIdx)
                }else{
                    return 0
                }
            default :            
                return data.length
        }
    }

    const length = getLength()

    const endNum = 1000
    const graphShow = ():number[] => {        
        if(Count == 1){
            return [0, endNum]         
        } else {
            if(Count * endNum > length){
                return [((Count-1) * endNum) + 1, length]
            }else{
                return [((Count-1) * endNum) + 1, Count * endNum]
            }
        }
    }
    const [slice,setSlice] = useState<number[]>(graphShow())
       
    let start = slice[0]
    let end = slice[1]        

    const getValue = (data:graphBpm[],i:number) => {
        if(bpm){
        return (i < data?.length) ? data[i]?.bpm : 0
        }else{
        return (i < data?.length) ? data[i]?.hrv : 0
        }
    }

    const onlyTodayDataGubun = (data:graphBpm) => {
        if(bpm){
          return  data?.bpm 
        }else{
          return  data?.hrv 
        }
    }

    const getData = () => {
        switch(true){
            case clickWritetimeButton.days2 :   
                const times:string[] = selectTime(writetime,1)                          
                const todayIndex = data.findIndex((el)=> {return el.writetime.includes(times[1])})
                const todayData = data?.slice(todayIndex,data.length-1)                
                const yesterdayData = data?.slice(0,todayIndex-1)
                const bigValue = compareValue(todayData,yesterdayData)
                const setData:any = []
                for(var i = start ; i <= end ; i++){
                    setData.push({usageLast1:getValue(yesterdayData,i),
                                    usageLast2:getValue(todayData,i),
                                    xAxis:bigValue[i]?.writetime.split(' ')[1]
                                })                     
                }
                return setData
            case clickWritetimeButton.days3 :
                const time:string[] = selectTime(writetime,1)                             
                const idx = data.findIndex((el)=> {return el.writetime.includes(time[0])})
                if(idx != -1){
                    const todayidx = data.findIndex((el)=> {return el.writetime.includes(time[1])})
                    const daysago = idx - 1
                    const yesterIndex = todayidx - 1
                    const days2agoData = data?.slice(0,daysago)
                    const yesderData = data?.slice(idx,yesterIndex)
                    const toData =  data?.slice(todayidx,data.length-1)
                    const bigValue = compareValue(toData,yesderData,days2agoData)
                    var days3Data:any = []                    
                    for(var i = start ; i <= end ; i++){                        
                        days3Data.push({
                                    usageLast3:getValue(days2agoData,i),
                                    usageLast4:getValue(yesderData,i),
                                    usageLast5:getValue(toData,i),
                                    xAxis:bigValue[i]?.writetime.split(' ')[1]})                     
                    }
                    return days3Data
                }else{
                    return 0
                }
            default :
           return data?.slice(start,end)?.map(d=>{
                    return  {usageLast:onlyTodayDataGubun(d),xAxis:d.writetime?.split(' ')[1]}  
                  });
        }
    }

    const lineData = getData() 
    
    function countHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
       if(e.currentTarget.id == "plus"){        
                setCount(Count+1)
                setBackBtn(false)
            if(((Count-1) * endNum) + 1 > length || length < ((Count + 1) * endNum)){
                setNextBtn(true)
            }
        }
        else{            
            if(Count > 1){
                setCount(Count-1)
                setNextBtn(false)
            }
            if(Count == 2){
                setBackBtn(true)                
            }else{
                setBackBtn(false)
            }
        } 
    }    

    useEffect(()=>{
        setSlice(graphShow())
    },[Count])    

    useEffect(()=>{
        const setLineName = () => {
            switch(true){
                case clickWritetimeButton.days2 : 
                    const times:string[] = selectTime(writetime,1)                    
                    const yesterTime = replaceYear(times[0])
                    const todayTime = replaceYear(times[1])
                    setLineName2(yesterTime)
                    setLineName3(todayTime)
                    break;
                case clickWritetimeButton.days3:
                    const calDayAgo2 = selectTime(writetime,2)
                    const calDayAgo1 = selectTime(writetime,1)
                    const dayAgo2 = replaceYear(calDayAgo2[0])
                    const dayAgo1 = replaceYear(calDayAgo1[0])
                    const today = replaceYear(calDayAgo1[1])                    
                    setLineName1(dayAgo2)
                    setLineName2(dayAgo1)
                    setLineName3(today)
                    break;
            }
        }
        setLineName()
    },[clickWritetimeButton,writetime])

    const getLine = () => {
        switch(true)
        {
            case clickWritetimeButton.days2 :
                return (
                    <>
                        <Line name={lineName2} yAxisId="left" type="monotone" dataKey="usageLast1" stroke="#8884d8"  dot={false} />                        
                        <Legend />
                        <Line name={lineName3} yAxisId="left" type="monotone" dataKey="usageLast2" stroke="#ff7300"  dot={false} />
                        <Legend />                        
                    </>
                );
            case clickWritetimeButton.days3 :
                return (
                    <>
                        <Line name={lineName1} yAxisId="left" type="monotone" dataKey="usageLast3" stroke="#8884d8" dot={false} />
                        <Legend />
                        <Line name={lineName2} yAxisId="left" type="monotone" dataKey="usageLast4" stroke="#ff7300" dot={false} />
                        <Legend />
                        <Line name={lineName3} yAxisId="left" type="monotone" dataKey="usageLast5" stroke="#7ac4c0" dot={false} />
                        <Legend />
                    </>
                );
            default :
                return (
                    <>                    
                    <Line name={bpm ? 'bpm' : 'hrv'} yAxisId="left" type="monotone" dataKey="usageLast" stroke="#8884d8" dot={false} />
                    <Legend />
                    </>
                );
        }
    }

    return (
        <Box sx={{width:350,height:350,marginTop:2}}>            
            <LineChart
                    width={335}
                    height={300}
                    data={lineData}                       
                >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="xAxis" allowDataOverflow={true} domain={[0,1000]}/>
                <YAxis yAxisId="left" domain={[0, 180]} width={30}/>
                <Tooltip active={true}/>
                {getLine()}
            </LineChart>
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <ButtonChartBpm id="minus" bgColor="#5388F7" disabled={backBtn} Handler={(e)=>countHandler(e)} front={false}/>                
                <Typography sx={{marginLeft:1,marginRight:1,fontSize:12,fontWeight:'bold',":hover":{cursor:'default'}}}>
                    이전,다음 {`${Count}/${Math.ceil(length / 1000)}`}
                </Typography>
                <ButtonChartBpm id="plus" bgColor="#5388F7" disabled={nextBtn} Handler={(e)=>countHandler(e)} front={true}/>                
            </Box>
        </Box>
    );
}