import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker,LocalizationProvider   } from '@mui/x-date-pickers';

type Props = {
    onChange:(value:any) => void
    width:number
    height:number
}

export const GraphDatePicker = ({onChange,width,height}:Props) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
            label="날짜"
            onChange={(value:any,context) =>onChange(value)}
            sx={{width:width,height:height}}/>
        </LocalizationProvider>
    );
}