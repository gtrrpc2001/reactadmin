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
import { writetimeButtonModal } from '../../../../../axios/interface/graphModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';

type Props = {
    clickWritetimeButton:writetimeButtonModal
    
}

export const BarCharts = ({clickWritetimeButton}:Props) => {
    const writetime:string = useSelector<RootState,any>(state => state.writetimeGraph)
    
    return (
        <Box sx={{width:350,height:350,marginTop:2}}>
            <BarChart
            width={335}
            height={300}
            data={[]}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="xAxis" height={15}/>
                <YAxis yAxisId="left" domain={[0, 100]} width={30}/>
                <Bar name={'비정상맥박'} yAxisId="left" type="monotone" dataKey="data" stroke="red" />
                <Legend />
                <Tooltip active={true}/>
            </BarChart>
        </Box>
    );
}