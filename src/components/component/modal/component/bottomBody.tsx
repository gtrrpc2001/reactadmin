import { Box } from "@mui/material";
import { FirstLineTextBox, SecondLineTextBox } from "./LineTextBox";


type Props = {
    actCal:number
    step:number
    temp:number
    distance:number
}

export const BottomBody = ({actCal,step,temp,distance}:Props) => {
    return (
        <Box sx={{":hover":{cursor:'default'}}}>            
              <FirstLineTextBox actCal={actCal} step={step} />
              <SecondLineTextBox temp={temp} distance={distance} />              
        </Box>
    );
}