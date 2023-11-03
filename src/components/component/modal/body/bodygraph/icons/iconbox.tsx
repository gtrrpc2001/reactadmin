import { Box ,SxProps,Theme,Typography} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';

type Props = {
    onClick:(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    boxID:string
    boxSx:SxProps<Theme> | undefined
    iconSx:SxProps<Theme> | undefined
    fontSx:SxProps<Theme> | undefined
    icons:string
    text:string
}



export const IconBox = ({onClick,boxID,boxSx,iconSx,fontSx,icons,text}:Props) => {

    const getIconSelect = (icons:string) => {
        switch(icons){
            case "bpm":
                return (<FavoriteIcon sx={iconSx} fontSize="medium"/>);
            case "pulse":
                return (<HeartBrokenOutlinedIcon sx={iconSx} fontSize="medium"/>  );
            case "hrv":
                return (<MonitorHeartOutlinedIcon sx={iconSx} fontSize="medium"/>);
            case "cal":
                return (<LocalFireDepartmentOutlinedIcon sx={iconSx} fontSize="medium"/>);
            case "step":
                return (<DirectionsRunIcon sx={iconSx} fontSize="medium"/>);
        }
    }

    return (
        <Box id={boxID} onClick={(e)=> onClick(e)} sx={boxSx}>
            {getIconSelect(icons)}
            <Typography sx={fontSx}>
                {text}
            </Typography>
        </Box>
    );
}