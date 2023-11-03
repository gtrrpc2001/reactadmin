import React,{ useMemo, useState} from "react";
import { useGlobalFilter, useSortBy,usePagination, useTable, Row, useRowSelect, TableOptions, TableState } from "react-table";
import { Search } from "../search/search";
import { COLUMNS } from "../column/columns";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { PageSelect } from "../combobox/PageSelect";
import './table.scss'
import { TablePageMoveButton } from "../buttons/tablePageMoveButton/tablePageMoveButton";
import { StopCheckbox } from "../checkbox/stopCheckbox";
import { Theader } from "./theader";
import { CellSelectHooks } from "../hooks/selectCheckboxHooks";
import { Tbody } from "./tbody";
import { Modal } from "../modal/modal";
import { cellActions, profileActions } from "../../createslice/createslices";
import { getProfile } from "../../../axios/api/serverApi";
import { getTime } from "../../../func/func";
import { profileModal } from "../../../axios/interface/profileModal";

type Props = {
    stopCheck:boolean
    stopHandleCheckbox:(event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Table = ({stopCheck,stopHandleCheckbox}:Props) =>{
    const columns = useMemo(() => COLUMNS,[])
    const data = useSelector<RootState,any>(state => state.historylast)
    const cellDispatch = useDispatch();
    const profileDispach = useDispatch();       
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const [values,setValues] = useState(Object)
            
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,        
        setGlobalFilter,   
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        selectedFlatRows,
                
    } = useTable({columns
        , data,
        autoResetSelectedRows: false,
    }, useGlobalFilter,useSortBy,usePagination,useRowSelect,CellSelectHooks,
    ); 
          
    const { pageSize,selectedRowIds } = state 
    
    const onClickToggleModal = async(e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,cell:any)=>{
        const row = cell?.row
        const column = cell?.column
        const values = cell?.row?.values
        const {eq,eqname,timezone} = values
        const cellVlaue = {eq,eqname,timezone}
        if(column?.id != 'selection'){
<<<<<<< HEAD
            if(!row?.isSelected)  {                
                const Profile = await getProfile(`/mslecgarr/arrCnt?eq=${eq}&startDate=${getTime(false,true,1)}&endDate=${getTime(false)}`)
=======
            if(!row?.isSelected)  { 
                const Profile = await getProfile(`/mslecgarr/arrCnt?eq=${eq}&startDate=${getTime(false,true,1)}&endDate=${getTime(false)}`)      
                console.log(Profile[0])                         
>>>>>>> d0516a432e869e3f844b0417a19622bf468e735d
                profileDispach(profileActions.profile(Profile))
                setValues(cell?.row?.values)
                cellDispatch(cellActions.cellValues(cellVlaue))
                setOpenModal(!isOpenModal);
            }
        }
    } 

    return (
        <>
            <div className="table-pagesize">
                <div className="clsStopCheckbox">
                    <StopCheckbox check={stopCheck} HandleCheckbox={stopHandleCheckbox}/>
                    <button  
                    className="selectButton"
                    onClick={()=>{const test = selectedFlatRows.map(
                        (d) => d.original
                        )
                        console.log(selectedFlatRows)                    
                    }}>
                        옵션
                    </button>
                    <Search onSubmit={setGlobalFilter}/>                       
                </div>
                <div className="clsTableControll">
                    <PageSelect pageSize={pageSize} setPageSize={(e) => setPageSize(e)}/>
                </div>
            </div>
            
            <div className="table">                       
                <table {...getTableProps()}>

                    <Theader headerGroups={headerGroups}/>
                    {isOpenModal && (
                        <Modal
                            open={isOpenModal}
                            setModalOpen={setOpenModal}
                            >                            
                        </Modal>
                        )            
                    }
                    <Tbody 
                    BodyProps={getTableBodyProps}
                    page={page}
                    prepareRow={prepareRow}
                    cellClick={onClickToggleModal}
                    />
                     
                </table>

                <TablePageMoveButton 
                gotoPage={gotoPage} 
                previousPage={previousPage} 
                nextPage={nextPage}
                state={state}
                pageOptions={pageOptions}
                pageCount={pageCount}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                />                   
            
            </div>            
        </> 
    );
}

export default Table;

