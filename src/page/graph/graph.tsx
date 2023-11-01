import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";



export const Graph = () =>{
    const navigate = useNavigate();
    const loginSelector = useSelector<RootState,boolean>(state => state.check)
    useEffect(()=>{
        if(!loginSelector)
            navigate('/')
    },)
    return (<div>
      graph
    </div>)
}