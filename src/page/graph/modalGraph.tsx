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
ResponsiveContainer,
} from 'recharts';

type Porps = {
  open_close:boolean
  bpm:number
  eq:string
  time:string
}

export const ModalRealTimeGraph = ({open_close,bpm,eq,time}:Porps) => { 
    const [open , setOpen] = useState<boolean>(true);
    let [dataArr] = useState<{ecg: number;}[]>([])

    const getEcgData = async() =>  {        
      try{                        
          const result =  await getEcg(`/mslecg/Ecg?eq=${eq}&startDate=${time}`)
          console.log(result?.length)
          if(open && (dataArr?.length < 500)){                          
            if(result.length > 560){
              result.slice(0,559).map(d=>{              
                dataArr?.push({ecg:d})
              })
            }else{
              result.map(d=>{              
                dataArr?.push({ecg:d})
              })
            }
                        
            if(dataArr?.length > 420){
              setOpen(false)
              // setSpreadData(dataArr)         
            }
          }else{
            result.map(d=>{
              dataArr.shift()
              dataArr.push({ecg:d})
            })
            // setSpreadData(dataArr)
          }
          console.log('실행중')
      }catch(E){
          console.log(E)
      }                      
  }
    
    useEffect(() => {     
      if(open_close)
          getEcgData();
      else
        dataArr.length = 0
          
      },[bpm])      
     
      
    return (
      <>
      {open == false ? (
    <ResponsiveContainer
        width={335}
        height={280}
    >
      <LineChart            
            data={dataArr}  
         >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="xAxis" allowDataOverflow={true} domain={[0,700]} width={0} height={0} /> 
        <YAxis yAxisId="left" domain={[0,1000]} width={30}/>
        <Tooltip active={true}/>               
        <Line yAxisId="left" type="monotone" dataKey="ecg" stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
      ) : (
        <Box sx={{width:335,height:280,display:'flex',justifyContent:'center',alignItems:'center'}}>
          <CircularProgress color="primary"/>
        </Box>
      )}
      </>
    );
};



