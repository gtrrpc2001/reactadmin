import React from "react";
import './PageSelect.scss'

type Props = {
    pageSize:number
    setPageSize: (pageSize: number) => void
}

export const PageSelect = ({pageSize,setPageSize}:Props) => {
 return (
       <div className="clsSelectPage">
        <select className="selectPage"
        value={pageSize} 
        onChange={(e) => setPageSize(Number(e.target.value))}>
                    {
                        [10,25,50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}개 씩 보기
                            </option>
                        ))
                    }
         </select>
        </div> 
    
 );
}