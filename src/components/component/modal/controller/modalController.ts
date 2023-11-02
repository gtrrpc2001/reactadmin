import { userBpmType } from "../../../../axios/interface/bpmType"
import { footerIcon } from "../../../../axios/interface/footerIcon"
import { historyLast } from "../../../../axios/interface/history_last"
import { modalValues } from "../../../../axios/interface/modalvalues"
import { getHour } from "../../../../func/func"

export const getHeartText = (arrCnt:number):string => {
    let value:string = "양호"
    if(arrCnt > 50 && arrCnt < 100)
    {
      value = "경고"
    }else if(arrCnt >= 100 ){
      value = "위험"
    } 
    return value
  }

  export const getUserBpmType = (bpm:number,sleepTime:number,upTime:number,settingBpm:number):userBpmType => { 
    let bpmTypeList:userBpmType = {rest:true,activity:false,sleep:false}    
    let nowHours = getHour()
    
    //설정 bpm  >= bpm 일경우 
    if(sleepTime <= nowHours || upTime > nowHours)
    {
      bpmTypeList = {rest:false,activity:false,sleep:true}
    }else{
      if(settingBpm <= bpm)
        bpmTypeList = {rest:false,activity:true,sleep:false}
      
    }
    return bpmTypeList;
  }

  export const getValues = (data:historyLast[],eq:string):modalValues => {    
    let modalList:modalValues = {writetime:'',bpm:0,arrCnt:0,actCal:0,step:0,temp:0,distance:0}
    let row 
   for (var i = 0 ; i < data?.length; i++){
     if(data[i].eq == eq){
       row = data[i]
       modalList = {writetime:row.writetime,bpm:row.bpm,arrCnt:row.arrcnt,actCal:row.calexe,step:row.step,temp:row.temp,distance:row.distanceKM}             
       break;
     }
   }     
   return modalList;
  }

  export const getDecimal = (value:number) : number => {    
    return value / 1000    
  }

  export const getClickFooter = (innerHTML:string):footerIcon => {
    const home = 'home'
    const graph = 'graph'
    const pulse = 'pulse'
    const profile = 'profile'    
    let iconClick:footerIcon = {home:true,graph:false,pulse:false,profile:false}
    switch(true){
      case innerHTML.includes(graph) :
        return {home:false,graph:true,pulse:false,profile:false}
      case innerHTML.includes(pulse) :
        return {home:false,graph:false,pulse:true,profile:false}
      case innerHTML.includes(profile) :
        return {home:false,graph:false,pulse:false,profile:true}
      default :
        return iconClick
    }
  }
