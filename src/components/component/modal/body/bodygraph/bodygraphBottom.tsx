import {Box, Typography} from "@mui/material";
import { dayGubunButtonModal, graphBpm, graphPulse, writetimeButtonModal } from "../../../../../axios/interface/graphModal";
import { RootState } from "../../../../../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

type Props = {
    clickWritetimeButton?:writetimeButtonModal
    clickDayGubunButton?:dayGubunButtonModal
    bpm?:boolean    
    
}

export const BodyGraphBpmBottom = ({clickWritetimeButton,bpm}:Props) => {
const writetime:string = useSelector<RootState,any>(state => state.writetimeGraph)
const data:graphBpm[] = useSelector<RootState,any>(state => state.bpmGraphValue)
const [max,setMax] = useState<number>(0)
const [min,setMin] = useState<number>(0)
const [aver,setAver] = useState<number>(0)
const [minus,setMimus] = useState<number>(0)
const [plus,setPlus] = useState<number>(0)

useEffect(()=>{
    const getValue = () => {
        if(data?.length != 0){
            const value = bpm ? data?.map(d => d.bpm) : data?.map(d => d.hrv)
            const max = Math?.max(...value)
            const min = Math?.min(...value)
            const aver = Math.floor(value?.reduce((total,next) => total + next,0) / value.length)
            setMax(max)
            setMin(min)
            setAver(aver)
            setMimus(aver - min)
            setPlus(max - aver)
        }
    }
    getValue()
},[data,clickWritetimeButton,writetime])

const childrenBoxStyle = {
position:'absolute',
textAlign:'center'
}

const textPadding = {
    paddingBottom:0.5
}

const textWeight = {
    fontWeight:'bold'
}

const hover = {":hover":{cursor:'default'}}
    return (
        <Box sx={{height:80,display:'flex',justifyContent:'center',marginTop:1}}>
            <Box sx={[childrenBoxStyle,{left:40},hover]}>
                <Typography sx={textPadding}>
                        {'Min'}
                </Typography>
                <Typography sx={textPadding}>
                        {min}                        
                </Typography>
                <Typography sx={{color:'#5388F7'}}>
                        {`-${minus}`}                        
                </Typography>
            </Box>
            <Box sx={[childrenBoxStyle,hover]}>
                <Typography sx={[textPadding,textWeight]}>
                    {bpm ? '평균심박수' : '평균변동률'}  
                </Typography>
                <Typography sx={[textPadding,textWeight]}>
                    {aver}
                </Typography>
                <Typography sx={textWeight}>
                    {bpm ?'BPM' : 'ms'}                    
                </Typography>
            </Box>
            <Box sx={[childrenBoxStyle,{right:40},hover]}>
                <Typography sx={textPadding}>
                    {'Max'}
                </Typography>
                <Typography sx={textPadding}>
                    {max}
                </Typography>
                <Typography sx={{color:'#ef507b'}}>
                    {`+${plus}`}
                </Typography>
            </Box>
        </Box>
    );
}

export const BodyGraphPulseBottom = ({clickDayGubunButton}:Props) => {
    const writetime:string = useSelector<RootState,any>(state => state.writetimeGraph)
    const data:graphPulse[] = useSelector<RootState,any>(state => state.barGraphValue)
    const [count,setCount] = useState<number>(0)
    useEffect(()=>{
        try{
            const dataValueAdd = data.reduce(function add(sum,currValue){            
                return +currValue.count + +sum;
            },0)
            setCount(dataValueAdd)
        }catch{

        }
    },[clickDayGubunButton,data,writetime])

    return(
        <Box sx={{display:'flex',height:50,marginTop:4}}>
            <Box sx={{textAlign:'center',position:'absolute', left:40}}>
                <Typography sx={{fontWeight:'bold'}}>
                    {'비정상맥박'}
                </Typography >
                <Typography sx={{fontWeight:'bold'}}>
                    {'(times/Day)'}
                </Typography>
            </Box>
            <Box sx={{textAlign:'center',position:'absolute',marginTop:1.5, right:80}}>
                <Typography sx={{fontWeight:'bold'}}>
                    {count}
                </Typography>
            </Box>
        </Box>
    );
}