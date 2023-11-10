import { Box } from '@mui/material';
import {
    BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
    Legend
} from 'recharts';
import { dayGubunButtonModal,graphModal } from '../../../../../axios/interface/graphModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import './barChart.scss'
import { useEffect, useState } from 'react';
import { getCalStep, getPulse, selectWeekDate } from '../../controller/modalController';

type Props = {
    dayGubunButtonModal:dayGubunButtonModal    
    iconSelect:graphModal
}

export const BarCharts = ({iconSelect,dayGubunButtonModal}:Props) => {
    const writetime:string = useSelector<RootState,any>(state => state.writetimeGraph)
    const data:any[] = useSelector<RootState,any>(state => state.barGraphValue)    
    const [max,setMax] = useState<number>(100) 
    
    const useGetData = () => {        
        switch(true){            
            case iconSelect.pulse :
                return getPulse(writetime,data,dayGubunButtonModal)
            default :
                return getCalStep(writetime,data,iconSelect,dayGubunButtonModal)
        }
    }

    const cal_stepBar = (bool:boolean) => {
        return (
            <>
                <Bar name={bool ? '걸음수' :'총 칼로리 (kcal)'} yAxisId="left" type="monotone" dataKey="data1" fill='red' />
                <Bar name={bool ? '거리 (m)' : '활동 칼로리 (kcal)'} yAxisId="left" type="monotone" dataKey="data2" fill='blue' />
            </>
        );
    }
    
    const bar = () => {
        switch(true){
            case iconSelect.cal :
                return cal_stepBar(false)
            case iconSelect.step :
                return cal_stepBar(true)                
            default :
             return <Bar name={'비정상맥박'} yAxisId="left" type="monotone" dataKey="data" fill='red' />
        }
    }

    const getDayButtonDomain = (max:number) => {
        switch(true){
            case dayGubunButtonModal.week :
                setMax(max * 4) 
                break;
            case dayGubunButtonModal.month :
                setMax(max * 7) 
                break;
            case dayGubunButtonModal.year :
                setMax(max * 11) 
                break;
            default :
                setMax(max) 
                break;
        }
    }

    const getYAxisDomain = () => {
        switch(true){
            case iconSelect.cal :
                getDayButtonDomain(400)
                break;
            case iconSelect.step :  
                getDayButtonDomain(800)
                break;
            default :
                getDayButtonDomain(100)
                break;
        }
    }

    useEffect(()=>{
        getYAxisDomain()
    },[iconSelect,dayGubunButtonModal])
    
    let barData = useGetData()    
    
    return (
        <Box sx={{width:350,height:320,marginTop:2}}>
            <BarChart
            width={335}
            height={300}
            data={barData}            
            >
                <CartesianGrid stroke="#f5f5f5"/>
                <XAxis dataKey="xAxis" height={15}/>
                <YAxis yAxisId="left" domain={[0,max]} width={30}/>
                {bar()}
                <Legend formatter={(value, entry, index) => <span className="text-color-class">{value}</span>}/>
                <Tooltip active={true}/>
            </BarChart>
        </Box>
    );
}


