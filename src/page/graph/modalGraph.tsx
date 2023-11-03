import { useEffect, useState } from "react";
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
    const [ecgData,setEcgData] = useState<number[]>([]);
    const [open , setOpen] = useState<boolean>(true);
    
    const setData = ecgData?.map(d=>{
      return {ecg:d,xAxis:d}
    })   
    
    useEffect(() => {
        let firstData:number[] = []
        const getEcgData = async() =>  {
            try{
                const result =  await getEcg(`/mslecg/Ecg?eq=${eq}&startDate=${time}`)   
                if(open){
                  firstData = result
                  if(firstData.length < 420){
                    result?.map(d=> {firstData.push(d)})
                  }else{
                    setEcgData(firstData)
                    setOpen(false)
                    firstData = []
                  }
                }else{
                  let data = ecgData
                  let i = 0
                  result.map(d=>{
                      data?.shift()
                      data?.push(d)
                      if(i == 140){
                        setEcgData(data)                   
                        i = 0
                      }
                      i ++
                  })
                }
            }catch(E){
                console.log(E)
            }                      
        }
        
        const timer = setInterval(async()=>{          
           await getEcgData()          
           
        },1000)

        
        return (() => clearTimeout(timer));
        
    },[bpm])    
     
      
    return (
      <>
      {open == false ? (
      <LineChart
            width={335}
            height={280}
            data={setData}  
         >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="xAxis" allowDataOverflow={true} domain={[0,600]} width={0} height={0} /> 
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



