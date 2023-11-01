import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { getEcg } from "../../axios/api/serverApi";
import { ApexOptions } from "apexcharts";

type Porps = {
    bpm:number
    eq:string
    time:string
    height:number
}

export const ModalRealTimeGraph = ({bpm,eq,time,height}:Porps) => {  
    const [ecgData,setEcgData] = useState<number[]>([]);
    const ecgRef = useRef<any>()
    
    const series:ApexAxisChartSeries = [
      {
        name: "ecgData",
        data: ecgData?.map(d=>d),
        
      }
    ]      
    
  const options:ApexOptions = {
      chart: {
        id: "realtime",
        type:'line',
        height:200,
        width:330,
        animations:{
          enabled:true,
          easing:"linear",                             
          dynamicAnimation:{
              speed:100
          }
        },
        events:{
          animationEnd:function (chartContext:ApexChart,options:ApexOptions){
            
          }
        },

        toolbar:{
          show:true,          
        },
        zoom:{
          enabled:false,
        } ,             
      },      
      xaxis: {
        categories:ecgData.slice(0,500)?.map(d=>d),        
        labels:{show:false}
      },      
      yaxis:{
          show:true,
          min:0,
          max:1000
      },
      fill:{
        type:'gradient'
      },
      markers: {
          showNullDataPoints:false
      },
      stroke:{            
          curve:"smooth"
      },
      dataLabels:{enabled:false},
      grid: { show: false },
      theme: { mode: "light" },
    }

    
    useEffect(() => {
        const getEcgData = async() =>  {
            try{
                const result =  await getEcg(`/mslecg/Ecg?eq=${eq}&startDate=${time}`)
                console.log(`${eq} -- ${time}`)
                ecgRef.current = result
                  
                
                  
                  
            }catch(E){
                console.log(E)
            }                      
        }
        
        const timer = setInterval(async()=>{          
           await getEcgData()          
           setEcgData(ecgRef.current)
          
        },1000)

        return (() => clearTimeout(timer));
        
    },[bpm])    
     
      
    return (
        <Chart options={options} series={series} type="line" width={330} height={height}/>
    );
}

