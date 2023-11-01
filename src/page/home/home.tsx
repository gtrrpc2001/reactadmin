import { useNavigate } from "react-router-dom";
import {  listActions, loginActions, } from "../../components/createslice/createslices";
import  { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { saveLog } from "../../data/login";
import './home.scss'
import {  getHistory } from "../../axios/api/serverApi";
import { getTime } from "../../func/func";
import { useEffect, useState } from "react";
import { Loading } from "../../components/component/loading/loading";
import { HomeBody } from "./body/body";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";

export default function Home(){
    const navigate = useNavigate();  
    const useCheckDispatch = useDispatch<AppDispatch>();
    const eqSelector = useSelector<RootState,string>(state => state.eq)
    const loginSelector = useSelector<RootState,boolean>(state => state.check)
    const InfoDispatch = useDispatch<AppDispatch>();
    const [check,setCheck] = useState(false)
    const [loading, setLoding] = useState(true); 
    const [editData, setEditData] = useState([])

    useEffect(()=> {
        async function getInfoList():Promise<any> {
            if(!loginSelector)
                navigate('/')
            try{
                const data:any = await getHistory(`/mslLast/webTable?writetime=${getTime(false)}`)                            
                setLoding(false)
                setEditData(data)
                if(data?.length != 0){
                    InfoDispatch(listActions.listHistory(data))                                        
                }
                return data;
            }catch(E){
                console.log(E)
                return [];
            }
        }
            const timer = setInterval(async() => {    
                if(!check)            
                    await getInfoList()                                          
            },1000)            
            
        return ()=>{clearTimeout(timer)}
        
    },[check])
    //

    const HandleLogout = async() =>{
        const loginBool = await saveLog(eqSelector,'로그아웃')
        useCheckDispatch(loginActions.loginCheck(!loginBool))
        navigate('/')
    }

    function HandleCheckbox(event: React.ChangeEvent<HTMLInputElement>): void {
        setCheck(event.target.checked)                
    }
    if(loading)
        return <Loading loading={loading} />

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


