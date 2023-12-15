import { useNavigate } from "react-router-dom";
import {  ModalActions, listActions, loginActions, nameActions, } from "../../components/createslice/createslices";
import  { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { saveLog } from "../../data/login";
import './home.scss'
import {  getHistory } from "../../axios/api/serverApi";
import { useEffect, useState } from "react";
import { Loading } from "../../components/component/loading/loading";
import { HomeBody } from "./body/body";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { historyLast } from "../../axios/interface/history_last";
import { setWindowLoginItems } from "../../func/func";

export default function Home(){
    const navigate = useNavigate();  
    const useCheckDispatch = useDispatch<AppDispatch>();
    const eqSelector = useSelector<RootState,string>(state => state.eq)
    const loginSelector = useSelector<RootState,boolean>(state => state.check)
    const InfoDispatch = useDispatch<AppDispatch>();
    const [check,setCheck] = useState(false)
    const [loading, setLoding] = useState(true);  
    const [data,setData] = useState<historyLast[]>([])            

    const isLoginSuv = window.localStorage.getItem("isLoginSuv")
    const isUserId = window.localStorage.getItem("isUserId")
    
    if(!loginSelector && isLoginSuv == "false"){        
        navigate('/')
    }
    
    async function getInfoList():Promise<any> {
        try{
            const getData:historyLast[] = await getHistory(`/mslLast/webTable`)                                                    
            setLoding(false)                
            if(getData?.length != 0){
                setData(getData)                    
                const names = getData.map((d:any)=>{ return {eq:d.eq,eqname:d.eqname}})
                InfoDispatch(nameActions.value(names))                                         
            }
            return data;
        }catch(E){
            console.log(E)
            return [];
        }
    }

    const table_modalData = () => {
        if(check == false)
            InfoDispatch(listActions.listHistory(data))

        InfoDispatch(ModalActions.ModalHistory(data))        
    }

    useEffect(()=> {
        
        const timer = setInterval(async() => {    
            if(loginSelector || isLoginSuv == "true")
                await getInfoList()                                          
        },1000)            
        
        if(!loginSelector)
            return ()=>{clearTimeout(timer)}
        
    },[loginSelector])
    
    useEffect(()=>{
        table_modalData();
    },[data])

    const HandleLogout = async() =>{
        const loginBool = await saveLog(eqSelector,'로그아웃')
        useCheckDispatch(loginActions.loginCheck(!loginBool))
        navigate('/')
        setWindowLoginItems("false","")
    }

    function HandleCheckbox(event: React.ChangeEvent<HTMLInputElement>): void {
        setCheck(event.target.checked)                
    }    

    return (
        <>  
    <div>
        {loading ? (
         <Loading loading={loading} />) : (
            <div className="home">
                <div className="header">
                    <Header />
                </div>
                <div className="body">
                    <HomeBody HandleLogout={HandleLogout} check={check} HandleCheckbox={HandleCheckbox}/>
                </div>
                <div className="footer">                
                    <Footer language={true}/> 
                </div>
            </div>
        )}
    </div>     
    </>
    );
}


