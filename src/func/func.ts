
export const getTime = (includeTime:boolean,mius:boolean=false,num:number = 0):string => {
  const today = new Date()
  const year = today.getFullYear()
  const getMonth = today.getMonth()
  const getDate = today.getDate()
  const month = mius? (getDate - num == 0 ? getMonth : getMonth + 1) : getMonth + 1
            var monthStr: string = month < 10 ? `0${month}` : month.toString()        
            const date = mius ? getYesterday(today,num) : getDate    
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

export const getYesterday = (today:Date,num:number):number => {
var yesterday = new Date(today.setDate(today.getDate() - num));
return yesterday.getDate()
}

export const getHour = ():number => {
const today = new Date()
return today?.getHours()
}
