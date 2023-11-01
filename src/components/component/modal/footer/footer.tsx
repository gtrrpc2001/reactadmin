import { Box, Typography } from "@mui/material";
import { useState } from "react";
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { footerIcon } from "../../../../axios/interface/footerIcon";

type Props = {
    onClick:(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    footerClick:footerIcon
}

export const Footer = ({onClick,footerClick}:Props) => {
    const [defaultColor , setdefaultColor] = useState('#8b8a8a') //#ef507b
    const [selectColor, setSelectColor] = useState('#ef507b')    
    const buttom = 15    
    const home =footerClick.home?selectColor:defaultColor
    const graph = footerClick.graph?selectColor:defaultColor
    const pulse = footerClick.pulse?selectColor:defaultColor
    const profile = footerClick.profile?selectColor:defaultColor
    
    return (       
        <Box sx={{width:330,height:70,display:'flex',bottom:0,alignItems:'center',":hover":{cursor:'default'}}}>
            <Box onClick={(e) =>onClick(e)} sx={{width:50,marginLeft:2}}>
                <HouseOutlinedIcon sx={{color:home,marginLeft:1}}  fontSize="large"/>                  
                <Typography sx={{fontWeight:'bold', color:home,position:'absolute',bottom:buttom,left:33}}>
                    {home == "#ef507b" ? "홈" : ""}
                </Typography>
            </Box>
            <Box onClick={(e) =>onClick(e)} sx={{width:60,marginLeft:2}}>
                <InsertChartOutlinedIcon sx={{color:graph,marginLeft:3}}  fontSize="large"/>                  
                <Typography sx={{fontWeight:'bold', color:graph,position:'absolute',bottom:buttom,left:107}}>
                    {graph == "#ef507b" ? "요약" : ""}
                </Typography>
            </Box>
            <Box onClick={(e) =>onClick(e)} sx={{width:120}}>
                <MonitorHeartOutlinedIcon sx={{color:pulse,marginLeft:7.5}}  fontSize="large"/>                  
                <Typography sx={{fontWeight:'bold', color:pulse,position:'absolute',bottom:buttom,right:90}}>
                    {pulse == "#ef507b" ? "비정상맥박" : ""}
                </Typography>
            </Box>
            <Box onClick={(e) =>onClick(e)} sx={{width:60,}}>
                <AccountBoxOutlinedIcon sx={{color:profile,marginLeft:3}}  fontSize="large"/>                  
                <Typography sx={{fontWeight:'bold', color:profile,position:'absolute',bottom:buttom,right:21}}>
                    {profile == "#ef507b" ? "프로필" : ""}
                </Typography>
            </Box>
        </Box>    
    );

    
}