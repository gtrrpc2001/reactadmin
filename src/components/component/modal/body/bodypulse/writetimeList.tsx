import { Box,ListItemIcon,ListItemText,List, ListItem, Typography, ListItemButton } from "@mui/material"
import { useEffect, useState } from "react";
import { getWritetimeList } from "../../data/data";
import { calculTime } from "../../controller/modalController";


type Props = {
    writetime:string
    id:string
    list:any[]
    setList:React.Dispatch<React.SetStateAction<any[]>>
    handler:(e: React.MouseEvent<HTMLLIElement, MouseEvent>)=>void
    eq:string
}

export const WritetimeList = ({writetime,id,list,setList,handler,eq}:Props) => {    
    
    useEffect(()=>{
        const getList = async() => {
            const day = writetime
            const calDate = calculTime(day,0)
            const result = await getWritetimeList(eq,day,calDate[1])            
            setList(result)            
        }
        getList()
    },[writetime])    
    
    const selectedColor = (index:number,box=false) => `${(id == `${index + 1}`) ? '#5388F7' : (box ? "black" :'#c3c1c1')}`

    const itemes = () =>{
        try{
            return (
                list?.map((value,index)=>{
                    const {writetime,address} = value
                    return (
                        <ListItem className="listItem" id={`${index + 1}`} onClick={(e)=>handler(e)}>
                        <ListItemButton sx={{padding:0}}>                    
                            <ListItemIcon>
                                <Box sx={{width:45,height:40,borderRadius:3,bgcolor:selectedColor(index,true),
                                display:'flex',justifyContent:'center',alignItems:'center',
                                ":hover":{cursor:'default'}}}>
                                    <Typography sx={{color:'white'}}>
                                        {address == null ? index + 1 : 'E'}    
                                    </Typography>                            
                                </Box>                        
                            </ListItemIcon>
                            <ListItemText className="text" sx={{display:'flex',justifyContent:'center',alignItems:'center',
                            border:1,borderRadius:3,borderColor:selectedColor(index),height:40,":hover":{cursor:'pointer'},
                            }} 
                            primary={writetime}/> 
                        </ListItemButton>
                        </ListItem>
                    );
                })
            );
        }catch{

        }
    }

    return (
    <Box
      sx={{ height: 250, width: 350, bgcolor: 'background.paper' }}
    >
      <List sx={{maxHeight:250,overflow:'auto',}}>
        {itemes()}    
      </List>
    </Box>
    );
}