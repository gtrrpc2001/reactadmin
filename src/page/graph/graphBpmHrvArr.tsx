import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { graphKindButton } from "../../axios/interface/graph";
import { useEffect, useState } from "react";

type Props = {
    data:any[]
    width:number
    height:number
    kind:graphKindButton
}

export const Graphs = ({data,width,height,kind}:Props) => {
    const [graphWidth,setGraphWidth] = useState<number>(width)
    const [scroll,setScroll] = useState<boolean>(false)
<<<<<<< HEAD
    const [calMax,setCalMax] = useState<number>(180)    
    const [Max,setMax] = useState<number>(180) 

=======
    const [calMax,setCalMax] = useState<number>(180) 
    const [Max,setMax] = useState<number>(180)
>>>>>>> 47779989206e319e66599c8c8d399518c75ea680
    const getCalculWidth = (length:number,setNumber:number) => {
        const num =  length / setNumber
        const setWidth = ((width * num) < width) ? width : (width * num)         
        setGraphWidth(setWidth)        
     } 

    useEffect(()=>{
        const getChangeWidth = () => {
            switch(true){
                case kind.ecg :
<<<<<<< HEAD
                    setMax(1000) 
=======
                    setMax(1000)
>>>>>>> 47779989206e319e66599c8c8d399518c75ea680
                    getCalculWidth(data?.length,2800);
                    break;
                case kind.cal_step :
                    const calM = Math.max(...data?.map(o=>o.cal > o.calexe ? o.cal : o.calexe))
                    const stepM = Math.max(...data?.map(o=>o.step > o.distanceKM ? o.step : o.distanceKM))
                    setCalMax(calM)
                    setMax(stepM)
                    getCalculWidth(1,1);
                    break;
                default : 
                    setMax(180)                      
                    getCalculWidth(data?.length,1500); 
            }            
        }
        getChangeWidth();
    },[data])

    useEffect(()=>{
        if(graphWidth > width){
            setScroll(true)
        }else{
            setScroll(false)
        }
    },[graphWidth])

    const changeGraph = () => {
        switch(true){
            case kind.ecg :
                return (
                    <>
                        <Line yAxisId="left" type="monotone" dataKey="ecg" stroke="#8884d8" dot={false}/>
                    </>
                );
            case kind.cal_step :
                return (
                    <>
                        <Bar name='걸음수' yAxisId="left" dataKey="step" fill="red"/>
                        <Bar name='걸음거리' yAxisId="left" dataKey="distanceKM" fill="blue"/>
                        <Bar name='칼로리' yAxisId="right" dataKey="cal" fill="#8884d8"/>
                        <Bar name='활동칼로리'yAxisId="right" dataKey="calexe" fill="#ef507b"/>
                        <YAxis yAxisId="right" orientation="right" domain={[0,calMax]}/>
                    </>
                );
            default :
                return (
                    <>                        
                        <Line name='맥박' yAxisId="left" type="monotone" dataKey="bpm" stroke="#ff7300" dot={false}/>
                        <Line name='맥박변동률' yAxisId="left" type="monotone" dataKey="hrv" stroke="#8884d8" dot={false}/>
                        <Bar name='비정상맥박발생지점' yAxisId="right" dataKey="arr" barSize={300} fill="#ef507b" />                        
                        <YAxis yAxisId="right" domain={[0,1]} orientation="right"/>
                    </>
                );
        }
    }

    return (
        <div style={{display:'flex',flexDirection:'row',overflowX:scroll ? 'scroll' : 'hidden',overflowY:'hidden',width:width,height:height+10}}>
        <ResponsiveContainer
        width={graphWidth}
        height={height}                
        >          
            <ComposedChart                                
            data={data}                                                 
            >
                <CartesianGrid stroke="#f5f5f5" />
                {/* //label={{value:"Pages",position: "insideBottomLeft", dy: 0}} */}
                <XAxis dataKey="time" />
                <Tooltip />
                <Legend align="left" wrapperStyle={{marginLeft:50}}/>
                <YAxis yAxisId="left" domain={[0,Max]}/>
                {changeGraph()}
            </ComposedChart>   
        </ResponsiveContainer>
        </div>
    );
}