import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

type Props = {
    list : {eq:string,eqname:string}[]
    handler : (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
    id:string
    width:number
    height:number
}

export const UserList = ({list,handler,id,width,height}:Props) => {

    const selectedColor = (eq:string,box=false) => `${(id == eq) ? '#5388F7' : (box ? "black" :'#c3c1c1')}`

    const itemes = () =>{
        try{
            return (
                list?.map((name,index)=>{
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