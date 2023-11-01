import { Typography } from "@mui/material";

type Props = {
    bottom:number
    left?:number
    right?:number
    value:string
}

export const TypoLeftText = ({bottom,left,value}:Props) => {
    return (
        <Typography sx={{fontWeight:'bold',fontSize:18,position:'absolute',bottom:bottom,left:left}}>
           {value}
        </Typography>
    );
}

export const TypoRightText = ({bottom,right,value}:Props) => {
    return (
        <Typography sx={{fontWeight:'bold',fontSize:18,position:'absolute',bottom:bottom,right:right}}>
           {value}
        </Typography>
    );
}