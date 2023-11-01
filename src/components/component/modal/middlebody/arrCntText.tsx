import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type Props = {
    arrCnt:number
}

export const ArrCntText = ({arrCnt}:Props) => {
    return (
        <Box sx={{display:'flex',width:'51%',justifyContent:'end',textAlign:'center'}}>
                  <Box sx={{width:'88%',bgcolor:'#ef507b',borderRadius:2,height:25,":hover":{cursor:'default'}}}>
                      <Typography sx={{position:'absolute',color:'white',
                      fontSize:13,fontWeight:'bold',wordSpacing:'pre-wrap',
                      top:195,right:20,letterSpacing:2}}>
                        비정상맥박&nbsp;&nbsp;&nbsp;&nbsp;{arrCnt}&nbsp;회
                      </Typography>
                  </Box>
        </Box>
    );
}