import { Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
import { graphKindButton } from "../../axios/interface/graph";

type Props = {
    data:any[]
    width:number
    height:number
    kind:graphKindButton
}

export const Graphs = ({data,width,height,kind}:Props) => {

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
                        <YAxis yAxisId="right" orientation="right"/>
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
        <ComposedChart
                        width={width}
                        height={height}
                        data={data} 
                        >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="time" />
            <Tooltip />
            <Legend />
            <YAxis yAxisId="left" />
            {changeGraph()}
        </ComposedChart>
    );
}