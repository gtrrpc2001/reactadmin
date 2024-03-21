import { Box } from "@mui/material";
import { ModalTopBody } from "./body/bodyhome/topbody/modalTopbody";
import { MiddleBody } from "./body/bodyhome/middlebody/middleBody";
import { ModalRealTimeGraph } from "../../../page/graph/modalGraph";
import { BottomBody } from "./component/bottomBody";
import { getDecimal, getHeartText } from "./controller/modalController";
import { modalValues } from "../../../axios/interface/modalvalues";
import { profileModal } from "../../../axios/interface/profileModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getOnlyArr } from "../../../axios/api/serverApi";

type Props = {
    open:boolean
    modalList: modalValues
    values:any
    getProfile:profileModal
}

export const ModalHome = ({open,modalList,values,getProfile}:Props) => {
  const getYesterdayArrCount = useSelector<RootState,number>(state => state.yesterdayArrCount)
  const [todayArr,setTodayArr] = useState(getProfile.arrCnt)
  const yesterdayArr = getYesterdayArrCount;
  const startDate = modalList.writetime?.split(' ')[0]
  const endDate = dayjs(new Date(startDate)).add(1,'day').format('YYYY-MM-DD')

  const getArr = async() => {
    const arrCount = await getOnlyArr(`mslecgarr/arrCount?eq=${values.eq}&startDate=${startDate}&endDate=${endDate}`)
    setTodayArr(arrCount.arrCnt)
    console.log(arrCount.arrCnt)
  }

  useEffect(()=>{
    getArr()
  },[modalList.arrCnt])

    return (
            <>   
              <ModalTopBody bpm={modalList.bpm} arrCnt={todayArr} prevArrCnt={yesterdayArr} HeartText={getHeartText(0)} />
              
              <MiddleBody 
              bpm={modalList.bpm} 
              arrCnt={todayArr} 
              sleepTime = {getProfile.sleeptime} 
              upTime={getProfile.uptime}
              settingBpm={getProfile.bpm}
              />              
              
              <Box>                
                <ModalRealTimeGraph open_close={open} bpm={modalList.bpm} eq={values.eq} time={modalList.writetime}/>
              </Box>

              <BottomBody actCal={modalList.actCal} step={modalList.step} temp={modalList.temp} distance={getDecimal(modalList.distance)}/>
            
              
            </>
              
            
    );
}