
export const getTime = (includeTime:boolean,mius:boolean=false,num:number = 0):string => {
  const today = new Date()
  const year = today.getFullYear()
  const getMonth = today.getMonth()
  const getDate = today.getDate()
  const month = mius? getLastMonth(today,getDate,num) : getMonth + 1
            var monthStr: string = month < 10 ? `0${month}` : month.toString()        
            const date = mius ? getYesterday(today,getDate,num) : getDate    
            var dateStr: string = date < 10 ? `0${date}` : date.toString()
            if(includeTime){
                const hour = today.getHours()
                var getHour = hour < 10 ? `0${hour}` : hour.toString()
                const minute = today.getMinutes()
                var getMinute = minute < 10 ? `0${minute}` : minute.toString()
                const second = today.getSeconds()
                var getSecond = second < 10 ? `0${second}` : second.toString()
                return `${year}-${monthStr}-${dateStr} ${getHour}:${getMinute}:${getSecond}`
            }else{
              return `${year}-${monthStr}-${dateStr}`
            }      

}

export const getChangeDate = (value:number):string => {
  return  value < 10 ? `0${value}` : value.toString()
}

export const getLastMonth = (today:Date,date:number,num:number):number => {
  var yesterday = new Date(today.setDate(date - num));  
  return yesterday.getMonth() + 1
  }

export const getYesterday = (today:Date,date:number,num:number):number => {  
var yesterday = new Date(today.setDate(date - num));
return yesterday.getDate()
}

export const getHour = ():number => {
const today = new Date()
return today?.getHours()
}

export const getCalendarTime = (value:any):string => {
  const {$D,$M,$y} = value
  const month = (($M+1) < 10) ? `0${$M+1}` : $M+1
  const date = ($D < 10) ? `0${$D}` : $D
  return `${$y}-${month}-${date}`
}

