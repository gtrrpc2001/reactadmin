import { Box,Typography } from "@mui/material";
import { useState } from "react";
import { graphKindButton } from "../../axios/interface/graph";

type Props = {
    onClick:(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>void
    fristItemWidth:number
    secondItemWidth:number
    thirdItemWidth:number
    kindButton:graphKindButton
}

export const GraphKindButton = ({onClick,kindButton,fristItemWidth,secondItemWidth,thirdItemWidth}:Props) => {
    const [defaultColor , setdefaultColor] = useState('gray') //#ef507b
    const [selectColor, setSelectColor] = useState('#5388F7')
    const border = 2 
    const borderRadius = 3   
    const marginLeft = 1    
    const bpm_hrv_arr =kindButton.bpm_hrv_arr?selectColor:defaultColor
    const cal_step = kindButton.cal_step?selectColor:defaultColor
    const ecg = kindButton.ecg?selectColor:defaultColor
    const sx = {border:border,borderRadius:borderRadius,width:fristItemWidth,
        textAlign:'center', marginLeft:marginLeft,":hover":{cursor:'pointer'}}

    return (
                      
        <Box sx={{display:'flex',alignItems:'center'}}>
            <Box id="bpm_hrv_arr" onClick={(e)=>onClick(e)}
            sx={[sx,{borderColor:bpm_hrv_arr}]}>                                
                <Typography>
                    맥박,맥박변동률,비정상맥박
                </Typography>
            </Box>
            <Box id="cal_step" onClick={(e)=>onClick(e)}
            sx={[sx,{borderColor:cal_step}]}>                                
                <Typography>
                    칼로리,걸음
                </Typography>
            </Box>
            <Box id="ecg" onClick={(e)=>onClick(e)}
            sx={[sx,{borderColor:ecg}]}>                                
                <Typography>
                    심전도
                </Typography>
            </Box>
        </Box>
            
    );
}