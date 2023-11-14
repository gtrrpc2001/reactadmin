import { Box, LinearProgress, Typography, styled } from "@mui/material";

type Props = {
    value:number
    barWidth:number
    color:string
    text:string
}

export const ProgressBar = ({value,barWidth,color,text}:Props) => {
    const LinearBar = styled(LinearProgress)`

  .MuiLinearProgress-barColorPrimary {
    background-color: ${color};
  }
`;
    return (
        <Box sx={{width:barWidth}}>
                <Typography sx={{textAlign:'center'}}>
                        {text}
                </Typography>
                <LinearBar 
                sx={{width:barWidth,height:15,borderRadius:3,bgcolor:'#a8a7a7',}} 
                variant="determinate"
                value={value}
                />                    
        </Box>
    );
}