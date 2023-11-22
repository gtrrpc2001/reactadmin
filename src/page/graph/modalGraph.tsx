import { useEffect, useRef, useState } from "react";
import { getEcg } from "../../axios/api/serverApi";
import { Box, CircularProgress } from "@mui/material";
import {
  LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
} from 'recharts';

type Porps = {
    bpm:number
    eq:string
    time:string
}

export const ModalRealTimeGraph = ({bpm,eq,time}:Porps) => { 
    const [open , setOpen] = useState<boolean>(true);
    const dataRef = useRef<{ecg: number; xAxis: number;}[]>([]) 
    
    useEffect(() => {
       
        const getEcgData = async() =>  {

            try{
              let setData:number[] = []
                const result =  await getEcg(`/mslecg/Ecg?eq=${eq}&startDate=${time}`)
                if(open){
                  result.map(d=>{setData.push(d)})
                  if(setData?.length > 420){
                    setOpen(false)
                    dataRef.current = setData.map(d=>{return {ecg:d,xAxis:d}})
                  }
                }else{
                  result.map(d=>{
                    dataRef.current.shift()
                    dataRef.current.push({ecg:d,xAxis:d})
                  })
                }  
            }catch(E){
                console.log(E)
            }                      
        }
        
        const timer = setInterval(async()=>{          
           await getEcgData()          
           
        },100)
        
        return (() => clearTimeout(timer));
        
    },[bpm])    
     
      
    return (
      <>
      {open == false ? (
      <LineChart
            width={335}
            height={280}
            data={dataRef.current}  
         >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="xAxis" allowDataOverflow={true} domain={[0,1000]} width={0} height={0} /> 
        <YAxis yAxisId="left" domain={[0,1000]} width={30}/>
        <Tooltip active={true}/>               
        <Line yAxisId="left" type="monotone" dataKey="ecg" stroke="#8884d8" dot={false} />
      </LineChart>
      ) : (
        <Box sx={{width:335,height:280,display:'flex',justifyContent:'center',alignItems:'center'}}>
          <CircularProgress color="primary"/>
        </Box>
      )}
      </>
    );
};



