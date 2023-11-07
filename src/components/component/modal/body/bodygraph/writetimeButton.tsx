import { Box, Button, Typography } from "@mui/material";
import { writetimeButtonModal } from "../../../../../axios/interface/graphModal";
import { useState } from "react";

type Props = {
    onClick:(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    clickWritetimeButton:writetimeButtonModal    
}

export const WritetimeButton = ({onClick,clickWritetimeButton}:Props) => {
    const [defaultColor , setdefaultColor] = useState('#bbb8b9')
    const [selectColor, setSelectColor] = useState('#040a5c')

    const today =clickWritetimeButton.today ? selectColor : defaultColor
    const days2 = clickWritetimeButton.days2 ? selectColor : defaultColor
    const days3 = clickWritetimeButton.days3? selectColor : defaultColor

    const todayChildren = clickWritetimeButton.today ? 'white' : '#8b8a8a'
    const days2Children = clickWritetimeButton.days2 ? 'white' : '#8b8a8a'
    const days3Children = clickWritetimeButton.days3 ? 'white' : '#8b8a8a'
    
    return (
        <Box sx={{height:50,display:'flex',alignItems:'center',marginBottom:1}}>
            <Button id="today" onClick={(e)=>onClick(e)} sx={{marginLeft:1.7,width:80,height:40,borderRadius:3,bgcolor:today}}>
                <Typography sx={{color:todayChildren}}>
                    {'Today'}
                </Typography>
            </Button>
            <Button id="days2" onClick={(e)=>onClick(e)} sx={{marginLeft:5,width:80,height:40,borderRadius:3,bgcolor:days2}}>
                <Typography sx={{color:days2Children}}>
                    {'2 Days'}
                </Typography>
            </Button>
            <Button id="days3" onClick={(e)=>onClick(e)} sx={{marginLeft:5.5,width:80,height:40,borderRadius:3,bgcolor:days3}}>
                <Typography sx={{color:days3Children}}>
                    {'3 Days'}
                </Typography>
            </Button>
        </Box>
    );
}