
export const getTime = (includeTime:boolean,mius:boolean=false,num:number = 0):string => {
  const today = new Date()
  const year = today.getFullYear()
  const getMonth = today.getMonth()
  const getDate = today.getDate()
<<<<<<< HEAD
  const month = mius? getLastMonth(today,num) : getMonth + 1
=======
  const month = mius? (getDate - num == 0 ? getMonth : getMonth + 1) : getMonth + 1
>>>>>>> d0516a432e869e3f844b0417a19622bf468e735d
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

export const getLastMonth = (today:Date,num:number):number => {
  var yesterday = new Date(today.setDate(today.getDate() - num ));
  return yesterday.getMonth() + 1
  }

export const getYesterday = (today:Date,num:number):number => {
var yesterday = new Date(today.setDate(today.getDate() - num));
<<<<<<< HEAD
return yesterday.getDate() + 1
=======
return yesterday.getDate()
>>>>>>> d0516a432e869e3f844b0417a19622bf468e735d
}

export const getHour = ():number => {
const today = new Date()
return today?.getHours()
<<<<<<< HEAD
}
=======
}
>>>>>>> d0516a432e869e3f844b0417a19622bf468e735d
