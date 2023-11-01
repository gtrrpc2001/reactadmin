import React, { useEffect, useRef } from "react";
import { TableToggleRowsSelectedProps } from "react-table";
import './stopCheckbox.scss'

export const CellCheckbox = React.forwardRef(
    ({indeterminate, ...rest }:any, ref:any) =>{
        const defaultRef = useRef();
        const resolvedRef = ref || defaultRef;  

        useEffect(() => {          
            resolvedRef.current.indeterminate = indeterminate;          
          }, [resolvedRef, indeterminate]);    

          return (
            <>
              <input 
              type="checkbox"              
              ref={resolvedRef} {...rest}           
              />
            </>
          );
    }
)

