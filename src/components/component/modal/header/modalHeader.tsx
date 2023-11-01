import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50';

export const ModalHeader = () => {

    const headerBox = {
        display:'flex',
        alignItems:'end'
      }
    
    const logoStyle = {
        width:130,
        paddingBlockStart:3,
        paddingInlineStart:3,
        fontWeight:'bold',
        cursor:'default',
        ":hover":{color:'#5388F7',transform:'Scale(1.1)'},
      }

      const flex = 'flex'
      const center = 'center'

    return (
        <Box sx={headerBox}>
            <Box sx={{display:flex,alignItems:center,position:'relative'}}>                  
                <Typography sx={logoStyle} id="title" variant="h6" component="h2">
                    LOOKHEART
                </Typography>
            </Box>
            <Box sx={{width:'80%',display:flex, alignItems:center,
                justifyContent: 'end',paddingBlockEnd:1,paddingInlineEnd:3}}> 
                <BatteryCharging50Icon sx={{transform:'rotate(90deg)',
                ":hover":{color:'green', fontSize:'large'}}}/>                
            </Box>
        </Box>
    );
}