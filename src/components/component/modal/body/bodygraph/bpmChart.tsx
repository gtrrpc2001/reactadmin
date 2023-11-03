import { Box,Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { graphBpm } from "../../../../../axios/interface/graphModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import {
    LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';
import { ButtonChartBpm } from "./bpmChartButton";


type Props = {
    eq:string
}

export const BpmChart = ({eq}:Props) => {
    let [Count ,setCount] = useState<number>(1)
    const [backBtn,setBackBtn] = useState<boolean>(true)
    const [nextBtn,setNextBtn] = useState<boolean>(false)
    const data:graphBpm[] = useSelector<RootState,any>(state => state.bpmGraphValue) 
    console.log(data)
    const length = data.length
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

    const lineData = data?.slice(start,end)?.map(d=>{
        return  {usageLast:d.bpm,xAxis:d.writetime?.split(' ')[1]}  
    })            
    
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

    return (
        <Box sx={{width:350,height:350,marginTop:2}}>            
            <LineChart
                    width={335}
                    height={300}
                     data={lineData}  
                     
                >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="xAxis" allowDataOverflow={true} domain={[0,1000]}/>
                <YAxis yAxisId="left" domain={[0,180]} width={30}/>
                <Tooltip active={true}/>
                {/* <Legend /> */}
            <Line yAxisId="left" type="monotone" dataKey="usageLast" stroke="#8884d8" dot={false} />
            </LineChart>
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <ButtonChartBpm id="minus" disabled={backBtn} Handler={(e)=>countHandler(e)} front={false}/>                
                <Typography sx={{marginLeft:1,marginRight:1,fontSize:12,fontWeight:'bold'}}>
                    이전,다음
                </Typography>
                <ButtonChartBpm id="plus" disabled={nextBtn} Handler={(e)=>countHandler(e)} front={true}/>                
            </Box>
        </Box>
    );
}