import { Row, TableBodyPropGetter, TableBodyProps } from "react-table";

type Props = {
    BodyProps: (propGetter?: TableBodyPropGetter<object> | undefined) => TableBodyProps
    page:Row<object>[]
    prepareRow:(row: Row<object>) => void
    cellClick:(e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>, cell: any) => void
}

export const Tbody = ({BodyProps,page,prepareRow,cellClick}:Props) =>{
    return (
        <tbody {...BodyProps()}>
            {page.map((row:Row) => {
                prepareRow(row);
                return (
                    <tr className="tbody_tr" {...row.getRowProps()}>                                
                                
                        {row.cells.map((cell:any)=>(
                            <td {...cell.getCellProps()} onClick={(e) => cellClick(e,cell)}>
                                {cell.render("Cell")}
                            </td>
                        ))} 
                                                        
                    </tr>
                );
            })}
        </tbody>

    );
}