import React from "react";

type Props = {
    className:string
    onClick: () => void
    disabled:boolean
    children:string
}

export const PageButton = ({className,onClick,disabled,children}:Props) => {
    return (
        <button 
        className={className}
        onClick={() => onClick()} 
        disabled={disabled}>
            {children}
         </button>
    );
}