import { userBpmType } from "../../../../axios/interface/bpmType"
import { footerIcon } from "../../../../axios/interface/footerIcon"
import { graphModal, writetimeButtonModal } from "../../../../axios/interface/graphModal"
import { historyLast } from "../../../../axios/interface/history_last"
import { modalValues } from "../../../../axios/interface/modalvalues"
import { getChangeDate, getHour, getTime } from "../../../../func/func"

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

  export const getClickFooter = (id:string):footerIcon => {
    const home = 'home'
    const graph = 'graph'
    const pulse = 'pulse'
    const profile = 'profile'    
    let iconClick:footerIcon = {home:true,graph:false,pulse:false,profile:false}
    switch(true){
      case id.includes(graph) :
        return {home:false,graph:true,pulse:false,profile:false}
      case id.includes(pulse) :
        return {home:false,graph:false,pulse:true,profile:false}
      case id.includes(profile) :
        return {home:false,graph:false,pulse:false,profile:true}
      default :
        return iconClick
    }
  }

  export const getClickGraph = (id:string):graphModal => {
    const bpm = 'bpm'
    const pulse = 'pulse'
    const hrv = 'hrv'
    const cal = 'cal'    
    const step = 'step'  
    let iconClick:graphModal = {bpm:true,pulse:false,hrv:false,cal:false,step:false}
    switch(true){
      case id.includes(pulse) :
        return {bpm:false,pulse:true,hrv:false,cal:false,step:false}
      case id.includes(hrv) :
        return {bpm:false,pulse:false,hrv:true,cal:false,step:false}
      case id.includes(cal) :
        return {bpm:false,pulse:false,hrv:false,cal:true,step:false}
      case id.includes(step) :
        return {bpm:false,pulse:false,hrv:false,cal:false,step:true}
      default :
        return iconClick
    }
  }

  export const getClickWriteimteButton = (id:string):writetimeButtonModal => {    
    const today = 'today'
    const days2 = 'days2'    
    const days3 = 'days3'  
    let iconClick:writetimeButtonModal = {today:true,days2:false,days3:false}
    switch(true){
      case id.includes(days2) :
        return {today:false,days2:true,days3:false}
      case id.includes(days3) :
        return {today:false,days2:false,days3:true}
      default :
        return iconClick
    }
  }

  

  export const checkNull = (value:number | undefined) => {
    return value == null ? 0 : value
  }

  export const getWritetimeValue = (day:Date):string => {
    const getYear = day.getFullYear() 
    const getMonth = day.getMonth() + 1
    const getDate = day.getDate()
    var monthStr: string = getChangeDate(getMonth)
    var dateStr: string = getChangeDate(getDate)
   return `${getYear}-${monthStr}-${dateStr}`    
}

  export const getWritetimeButtomValue = (writetime:string,num:number):string => {    
      const day = new Date(writetime)    
      const writetimeArr = writetime.split('-')
      const d = new Date(day.setDate(Number(writetimeArr[2]) - num))    
      const getMonth = d.getMonth() + 1
      const getDate = d.getDate()
      var monthStr: string = getChangeDate(getMonth)
      var dateStr: string = getChangeDate(getDate)
     return `${monthStr}-${dateStr} ~ ${writetimeArr[1]}-${writetimeArr[2]}`    
  }

 export const compareToWritetime = (originalWritetime:string,fromEffect:boolean=false):boolean => {
    const time1Arr = originalWritetime.split('-')
    const time2Arr = getTime(false).split('-')   
    let bool = false        
    if(Number(time1Arr[0]) == Number(time2Arr[0])){
        if(Number(time1Arr[1]) == Number(time2Arr[1])){
            if(fromEffect ? Number(time1Arr[2]) == +time2Arr[2]  : (Number(time1Arr[2]) == +time2Arr[2] - 1)){
                bool = true;
            }
        }
    }
    return bool;
}

export const calculTime = (writetime:string,num:number):string[] => {
  const day = new Date(writetime)
  const date = day.getDate()
  const endDay = new Date(day.setDate(date + 1))
  const startDay = num == 0 ? day : new Date(day.setDate(date - num))
  const endDate = getWritetimeValue(endDay)
  const startDate = getWritetimeValue(startDay)
  return [startDate,endDate]
}


export const selectTime = (writetime:string,num:number):string[] => {
  const day = new Date(writetime)
  const date = day.getDate()
  const startDay = num == 0 ? day : new Date(day.setDate(date - num))
  const startDate = getWritetimeValue(startDay)
  return [startDate,writetime]
}

export const replaceYear = (time:string):string => {
  const times = time.split('-')
  return `${times[1]}-${times[2]}`
}

  

  
