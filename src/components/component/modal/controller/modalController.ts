import { userBpmType } from "../../../../axios/interface/bpmType"
import { footerIcon } from "../../../../axios/interface/footerIcon"
import { dayGubunButtonModal, graphModal, writetimeButtonModal } from "../../../../axios/interface/graphModal"
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

  export const getClickDayGubunButton = (id:string):dayGubunButtonModal => {    
    const day = 'day'
    const week = 'week'    
    const month = 'month'  
    const year = 'year'  
    let iconClick:dayGubunButtonModal = {day:true,week:false,month:false,year:false}
    switch(true){
      case id.includes(year) :
        return {day:false,week:false,month:false,year:true}
      case id.includes(week) :
        return {day:false,week:true,month:false,year:false}
      case id.includes(month) :
        return {day:false,week:false,month:true,year:false}      
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

export const compareYearMonth = (Writetime:string):boolean => {
  const time1Arr = Writetime.split('-')
  const time2Arr = getTime(false).split('-')   
  let bool = false        
  if(Number(time1Arr[0]) == Number(time2Arr[0])){
      if(Number(time1Arr[1]) == Number(time2Arr[1])){          
        bool = true;          
      }
  }
  return bool;
}

export const compareFullYear = (Writetime:string):boolean => {
  const time1Arr = Writetime.split('-')
  const time2Arr = getTime(false).split('-')   
  let bool = false        
  if(Number(time1Arr[0]) == Number(time2Arr[0])){               
     bool = true;  
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

export const calculWeek = (writetime:string):string[] => {
  const day = new Date(writetime)
  const date = day.getDate()
  const endDay = new Date(day.setDate(date + 7))
  const startDay = new Date(day.setDate(date - 7))
  const endDate = getWritetimeValue(endDay)  
  const startDate = getWritetimeValue(startDay)
  return [startDate,endDate]
}

export const calculMonth = (writetime:string):string[] => {
  const day = new Date(writetime)
  const month = day.getMonth()
  const endDay = new Date(day.setMonth(month + 1))
  const startDay = new Date(day.setMonth(month - 1))
  const endDate = getWritetimeValue(endDay)
  const startDate = getWritetimeValue(startDay)  
  return [startDate,endDate]
}

export const calculYear = (writetime:string):string[] => {
  const day = new Date(writetime)
  const year = day.getFullYear()
  const endDay = new Date(day.setFullYear(year + 1))
  const startDay = new Date(day.setFullYear(year - 1))
  const endDate = getWritetimeValue(endDay)
  const startDate = getWritetimeValue(startDay)  
  return [startDate,endDate]
}

export const compareDay = (id:string,writetime:string):boolean => {
  const currentWeek = selectWeek(writetime)
  const lastDay =   currentWeek[currentWeek.length - 1]
  const nowWeek = selectWeek(getTime(false))[currentWeek.length - 1]  
  return id == 'minus'? false : (lastDay == nowWeek)
}

export const compareMonth = (id:string,writetime:string):boolean => {  
  const bool = compareYearMonth(writetime)  
  return id == 'minus'? false : bool
}

export const compareYear = (id:string,writetime:string):boolean => {  
  const bool = compareFullYear(writetime)  
  return id == 'minus'? false : bool
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

export const getYearMonth = (time:string,day:Date):string => {
  if(time != ''){
    const times = time.split('-')
    return `${times[0]}-${times[1]}`
  }else{
    const year = day.getFullYear()
    const getMonth = day.getMonth() + 1
    const month = `${getMonth}`.length > 1 ? `${getMonth}` : `0${getMonth}`
    return `${year}-${month}`
  }
}

export const getFullYear = (day:Date):string => {  
    const year = day.getFullYear()
    return `${year}`
  
}

export const getYear = (time:string):string => {
  const times = time.split('-')
  return times[0]
}

export const selectWeek = (writetime:string):string[] => {
  const currentDay = new Date(writetime)
  var theYear = currentDay.getFullYear();
  var theMonth = currentDay.getMonth();
  var theDate  = currentDay.getDate();
  var theDayOfWeek = currentDay.getDay();
  var thisWeek = [];
  var j = 0
  for(var i=1; i<8; i++) {
        var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
        var yyyy = `${resultDay.getFullYear()}`;
        var mm = `${Number(resultDay.getMonth()) + 1}`;
        var dd = `${resultDay.getDate()}`;               
        mm = String(mm).length === 1 ? '0' + mm : mm;
        dd = String(dd).length === 1 ? '0' + dd : dd;
        thisWeek[j] = yyyy + '-' + mm + '-' + dd;
        j++
  }
  return thisWeek
}

export const selectWeekDate = (writetime:string):string[] => {
  const currentDay = new Date(writetime)
  var theYear = currentDay.getFullYear();
  var theMonth = currentDay.getMonth();
  var theDate  = currentDay.getDate();
  var theDayOfWeek = currentDay.getDay();
  var thisWeek = [];
  var j = 0
  for(var i=1; i<8; i++) {
        var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
        var dd = `${resultDay.getDate()}`;                       
        dd = String(dd).length === 1 ? '0' + dd : dd;
        thisWeek[j] = dd;
        j++
  }
  return thisWeek
}

export const getPulse = (writetime:string,data: any[],dayGubunButtonModal:dayGubunButtonModal) => {   
  const week = ['월','화','수','목','금','토','일']
  if(dayGubunButtonModal.week){
      let setData = []
      const currentWeek = selectWeekDate(writetime)                  
      let j = 0
      for(var i = 0; i < week.length; i++){  
          let bool = currentWeek[i] == data[j]?.writetime
              setData.push({
                  data: (bool) ? data[j]?.count : 0,
                  xAxis: week[i]
              })
              if(bool)
                  j++                          
      }
      return setData
  }else{
      try{
          return data?.map((d)=>{                    
              return {
                  data:d.count,
                  xAxis:d.writetime
              }
          })
      }catch{

      }
  }                    

}

export const getCalStep = (writetime:string,data: any[],iconSelect: graphModal,dayGubunButtonModal:dayGubunButtonModal) => {
  const week = ['월','화','수','목','금','토','일']                       
  const cal = iconSelect.cal
  if(dayGubunButtonModal.week){
      let setData = []
      const currentWeek = selectWeekDate(writetime)                  
      let j = 0
      for(var i = 0; i < week.length; i++){  
          let bool = currentWeek[i] == data[j]?.writetime
              setData.push({
                  data1: (bool) ? (cal ? data[j]?.cal : data[j]?.step) : 0,
                  data2:(bool) ? (cal ? data[j]?.calexe : data[j]?.distanceKM) : 0,
                  xAxis: week[i]
              })
              if(bool)
                  j++                          
      }
      return setData
  }else{
      try{
          return data?.map((d)=>{                    
              return {
                  data1:cal ? d.cal : d.step,
                  data2:cal ? d.calexe : d.distanceKM,
                  xAxis:d.writetime
              }
          })
      }catch{

      }
  }                
}

export const graphSliceShow = (Count:number,length:number):number[] => {                
  const endNum = 1000
  if(Count == 1){
      return [0, endNum]         
  } else {
      if(Count * endNum > length){
          return [((Count-1) * endNum) + 1, length]
      }else{
          return [((Count-1) * endNum) + 1, Count * endNum]
      }
  }        
}



  

  
