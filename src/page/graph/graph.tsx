import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/component/loading/loading";
import { Header } from "../home/header/header";
import { Footer } from "../home/footer/footer";
import '../home/home.scss'
import { GraphList } from "./graphList";

export const Graph = () =>{
    const navigate = useNavigate();
    const [loading, setLoding] = useState(true);
    const loginSelector = useSelector<RootState,boolean>(state => state.check)
    const names = useSelector<RootState,{eq:string,eqname:string}[]>(state => state.names)
    
    useEffect(()=>{
        if(!loginSelector)
            navigate('/')
            setLoding(false)    
    },[])
    
    return (
      <div>
        {loading ? (
        <Loading loading={loading} />) : (
            <div className="home">
                <div className="header">
                    <Header />
                </div>
                <div className="body">
                  <GraphList names={names}/>
                </div>
                <div className="footer">                
                    <Footer language={true}/> 
                </div>
            </div>
        )}
    </div>
    );
}
