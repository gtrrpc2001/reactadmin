import { userBpmType } from "../../../../axios/interface/bpmType"
import { footerIcon } from "../../../../axios/interface/footerIcon"
import { graphKindButton } from "../../../../axios/interface/graph"
import { dayGubunButtonModal, graphModal, writetimeButtonModal } from "../../../../axios/interface/graphModal"
import { historyLast } from "../../../../axios/interface/history_last"
import { modalValues } from "../../../../axios/interface/modalvalues"
import { getChangeDate, getHour } from "../../../../func/func"

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

  export const getClickGraphKindButton = (id:string):graphKindButton => {    
    const bpm_hrv_arr = 'bpm_hrv_arr'
    const cal_step = 'cal_step'          
    const ecg = 'ecg'  
    let iconClick:graphKindButton = {bpm_hrv_arr:true,cal_step:false,ecg:false}
    switch(true){
      case id == ecg :
       return {bpm_hrv_arr:false,cal_step:false,ecg:true}
      case id == cal_step :
        return {bpm_hrv_arr:false,cal_step:true,ecg:false}       
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

 export const compareToWritetime = (updateWritetime:string,originalWritetime:string,fromEffect:boolean=false):boolean => {
    const time1Arr = originalWritetime.split('-')
    const time2Arr = updateWritetime.split('-')   
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

export const compareYearMonth = (updateWritetime:string,Writetime:string):boolean => {
  const time1Arr = Writetime.split('-')
  const time2Arr = updateWritetime.split('-')   
  let bool = false        
  if(Number(time1Arr[0]) == Number(time2Arr[0])){
      if(Number(time1Arr[1]) == Number(time2Arr[1])){          
        bool = true;          
      }
  }
  return bool;
}

export const compareFullYear = (updateWritetime:string,Writetime:string):boolean => {
  const time1Arr = Writetime.split('-')
  const time2Arr = updateWritetime.split('-')   
  let bool = false        
  if(Number(time1Arr[0]) == Number(time2Arr[0])){               
     bool = true;  
  }
  return bool;
}

export const calculMin = (writetime:string,num:number):string => {
  const day = new Date(writetime)
  const min = day.getMinutes()  
  const startDay = num == 0 ? day : new Date(day.setMinutes(min + num))  
  const startDate = getWritetimeValue(startDay)
  const _hour = startDay.getHours()
  const hour = (_hour >= 10) ? _hour : `0${_hour}`
  const _minute = startDay.getMinutes()
  const minute = (_minute >= 10) ? _minute : `0${_minute}`
  return `${startDate} ${hour}:${minute}`
}

// export const calculTime = (writetime:string,num:number):string[] => {
//   const day = new Date(writetime)
//   const date = day.getDate()
//   const endDay = new Date(day.setDate(date + 1))  
//   const endDate = getWritetimeValue(endDay)
//   const startDate = getMinusDateWritetime(writetime,num)
//   return [startDate,endDate]
// }

// export const getMinusDateWritetime = (time:string,num:number):string => {
//   const date = new Date(time)
//   const minusDate = new Date(date.setDate(date.getDate() - num))
//   const getYear = minusDate.getFullYear() 
//   const getMonth = minusDate.getMonth() + 1
//   const getDate = minusDate.getDate()
//   var monthStr: string = getChangeDate(getMonth)
//   var dateStr: string = getChangeDate(getDate)
//  return `${getYear}-${monthStr}-${dateStr}`    
// }

// export const getMinusMonthWritetime = (time:string,num:number):string => {
//   const date = new Date(time)
//   const minusDate = new Date(date.setMonth(date.getMonth() - num))
//   const getYear = minusDate.getFullYear() 
//   const getMonth = minusDate.getMonth() + 1
//   const getDate = minusDate.getDate()
//   var monthStr: string = getChangeDate(getMonth)
//   var dateStr: string = getChangeDate(getDate)
//  return `${getYear}-${monthStr}-${dateStr}`    
// }

// export const calculWeek = (writetime:string):string[] => {
//   const day = new Date(writetime)
//   const date = day.getDate()
//   const endDay = new Date(day.setDate(date + 7))  
//   const endDate = getWritetimeValue(endDay)  
//   const startDate = getMinusDateWritetime(writetime,7)
//   return [startDate,endDate]
// }
export const calculTime = (writetime:string,num:number):string[] => {
  const realDate = +writetime.split('-')[2]
  const day = new Date(writetime)
  const date = day.getDate()
  let endDay = new Date(day.setDate(date + 1))  
  if(realDate == endDay.getDate()){
    endDay = new Date(day.setDate(date + 2))
  }
  const endDate = getWritetimeValue(endDay)
  const startDate = getMinusDateWritetime(writetime,num)
  return [startDate,endDate]
}

export const getMinusDateWritetime = (time:string,num:number):string => {
  const realDate = +time.split('-')[2]
  const date = new Date(time)  
  let minusDate
  if(realDate == date.getDate()){
    minusDate = new Date(date.setDate(date.getDate() - num))    
  }else{
    minusDate = num > 1 ? new Date(date.setDate(date.getDate() - num)) : date
  }
  const getYear = minusDate.getFullYear() 
  const getMonth = minusDate.getMonth() + 1
  const getDate = minusDate.getDate()
  var monthStr: string = getChangeDate(getMonth)
  var dateStr: string = getChangeDate(getDate)
 return `${getYear}-${monthStr}-${dateStr}`    
}

export const getMinusMonthWritetime = (time:string,num:number):string => {
  const date = new Date(time)
  const minusDate = new Date(date.setMonth(date.getMonth() - num))
  const getYear = minusDate.getFullYear() 
  const getMonth = minusDate.getMonth() + 1
  const getDate = minusDate.getDate()
  var monthStr: string = getChangeDate(getMonth)
  var dateStr: string = getChangeDate(getDate)
 return `${getYear}-${monthStr}-${dateStr}`    
}

export const calculWeek = (writetime:string):string[] => {
  const realDate = +writetime.split('-')[2]
  const day = new Date(writetime)
  const date = day.getDate()
  let endDay = new Date(day.setDate(date + 7))  
  if(realDate == date - 1){
    endDay = new Date(day.setDate(date + 8))
  }
  const endDate = getWritetimeValue(endDay)  
  const startDate = getMinusDateWritetime(writetime,7)
  return [startDate,endDate]
}

export const calculMonth = (writetime:string):string[] => {
  const day = new Date(writetime)
  const month = day.getMonth()
  const endDay = new Date(day.setMonth(month + 1))  
  const endDate = getWritetimeValue(endDay)
  const startDate = getMinusMonthWritetime(writetime,1)    
  console.log(startDate)
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

export const compareDay = (id:string,updateWritetime:string,writetime:string):boolean => {
  const currentWeek = selectWeek(writetime)
  const lastDay =   currentWeek[currentWeek.length - 1]
  const nowWeek = selectWeek(updateWritetime)[currentWeek.length - 1]  
  return id == 'minus'? false : (lastDay == nowWeek)
}

export const compareMonth = (id:string,updateWritetime:string,writetime:string):boolean => {  
  const bool = compareYearMonth(updateWritetime,writetime)  
  return id == 'minus'? false : bool
}

export const compareYear = (id:string,updateWritetime:string,writetime:string):boolean => {  
  const bool = compareFullYear(updateWritetime,writetime)  
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

export const progressBarValue = (settingValue:number,value:number,check = false):number=> {
  try{        
      if(check){
         const km = settingValue * 1000
         const calValue = value
         const percent = (calValue/km * 100) >= 100 ? 100 : calValue/km * 100                                                    
          return percent
      }else{
          const percent = (value/settingValue * 100) >= 100 ? 100 : value/settingValue * 100
          return percent
      }
  }catch{
      return 0
  }
}

export const getPulseEcgDataConverter = (result:string[]) => {
  let dataList:any[] = []
  const getData = result?.map((value:any)=>{
    const {ecgpacket} = value
    if(ecgpacket?.length != 0){
        const arr:string[] = ecgpacket?.split(',')
       return arr?.filter((value,index)=>{
            if(index > 3){
                dataList.push({ecg:Number(value)})
                return value
            }
        })                        
    }else{
        return dataList.push({ecg:0})
    }                        
})
return dataList
}



  

  
