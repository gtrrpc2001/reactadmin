import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

type Props = {
    nameList? : {eq:string,eqname:string}[]
    timeList? :any[]
    handler : (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
    id:string
    width:number
    height:number
}

export const UserList = ({nameList,handler,id,width,height}:Props) => {

    const selectedColor = (eq:string,box=false) => `${(id == eq) ? '#5388F7' : (box ? "black" :'#c3c1c1')}`

    const itemes = () =>{
        try{
            return (
                nameList?.map((name,index)=>{
                    const {eq,eqname} = name                    
                    return (
                        <ListItem className="listItem" id={eq} onClick={(e)=>handler(e)}>

                        <ListItemButton sx={{padding:0}}>                    
                            <ListItemIcon>
                                <Box sx={{width:45,height:40,borderRadius:3,bgcolor:selectedColor(eq,true),
                                display:'flex',justifyContent:'center',alignItems:'center',
                                ":hover":{cursor:'default'}}}>
                                    <Typography sx={{color:'white'}}>
                                        {index + 1}    
                                    </Typography>                            
                                </Box>                        
                            </ListItemIcon>
                            <ListItemText className="text" sx={{display:'flex',justifyContent:'center',alignItems:'center',
                            border:1,borderRadius:3,borderColor:selectedColor(eq),height:40,":hover":{cursor:'pointer'},
                            }} 
                            primary={eqname}/> 
                        </ListItemButton>
                        </ListItem>
                    );
                })
            );
        }catch{

        }
    }
    
    return (
        <List sx={{width:width,maxHeight:height,overflow:'auto',}}>
            {itemes()}    
        </List> 
    );
}

export const TimeList = ({timeList,handler,id,width,height}:Props) => {

    const selectedColor = (time:string,box=false) => `${(id == time) ? '#5388F7' : (box ? "black" :'#c3c1c1')}`

    const itemes = () =>{
        try{
            return (
                timeList?.map((time,index)=>{
                    const {writetime} = time
                    const value = `${writetime}0`
                    return (
                        <ListItem className="listItem" id={value} onClick={(e)=>handler(e)}>

                        <ListItemButton sx={{padding:0}}>                    
                            <ListItemIcon>
                                <Box sx={{width:35,height:30,borderRadius:3,bgcolor:selectedColor(value,true),
                                display:'flex',justifyContent:'center',alignItems:'center',
                                ":hover":{cursor:'default'}}}>
                                    <Typography sx={{color:'white'}}>
                                        {index + 1}    
                                    </Typography>                            
                                </Box>                        
                            </ListItemIcon>
                            <ListItemText className="text" sx={{display:'flex',justifyContent:'center',alignItems:'center',
                            border:1,borderRadius:3,borderColor:selectedColor(value),height:30,":hover":{cursor:'pointer'},
                            }} 
                            primary={value}/> 
                        </ListItemButton>
                        </ListItem>
                    );
                })
            );
        }catch{

        }
    }
    
    return (
        <List sx={{width:width,maxHeight:height,overflow:'auto',}}>
            {itemes()}    
        </List> 
    );
}