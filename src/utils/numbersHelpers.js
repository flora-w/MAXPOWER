import findKey from 'lodash/findKey';
import isNumber from 'lodash/isNumber';

import * as COLOR from 'constants/colors';

export const units = {
  M: 1000000,
  K: 1000,
  '': 1,
  '%': 0.01,
};

export function unitFormat(value) {
  for (let [unit, base] of Object.entries(units)) {
    if (Math.abs(value / base) >= 1) {
      return { unit, value: value / base };
    }
  }
  return { unit: '%', value: value / 0.01 };
}

const colors = {
  [COLOR.RED]: {
    upper: 60,
  },
  [COLOR.BLUE]: {
    upper: 80,
  },
  [COLOR.GREEN]: {
    upper: 100,
  },
};

export function getColorByPecentage(perct) {
  return findKey(colors, key => key.upper > perct);
}

export const toPrecision = dp => value =>
  isNumber(value) && isFinite(value) && !isNaN(value) ? value.toFixed(dp) : '-';

export const textRender = (unit = 'K') => text => {
  let value = Number(text);
  if (isNaN(value)) {
    return text;
  }

  if (value === 0) {
    return '-';
  }

  if (unit === 'K') {
    value = value / 1e3;
  }

  if (unit === 'M') {
    value = value / 1e6;
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(value);
};

export const toDisplayValue = ({
  value,
  unit = 1,
  precision = 0,
  defaultValue = '-',
}) => {
 // console.log(value);
  const displayValue = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value / unit);

  return displayValue === 'NaN' ? defaultValue : displayValue;
};

export const tableCellRenderer = ({ unit = 1, precision = 0 }) => text => {
  const value = Number(text);
  if (isNaN(value) || !isFinite(value) || value === 0) {
    return '-';
  }

  return toDisplayValue({ value, unit, precision });
};

export function formatNum (number) {
  var str = number.toString();
  var newStr = "";
  var count = 0;
  if (str.indexOf(".") === -1) 
  {
    for (var i = str.length - 1; i >= 0; i--) 
    {
      if (count % 3 === 0 && count !== 0 && str.charAt(i) !== '-')
      {
        newStr = str.charAt(i) + "," + newStr;
      } 
      else 
      {
        newStr = str.charAt(i) + newStr;
      }
      count++;
    }
    // 自动补小数点后两位
    // str = newStr + ".00";
    str = newStr;
    return str;
  } 
  else 
  {
    for (var j = str.indexOf(".") - 1; j >= 0; j--) 
    {
      console.log(str.charAt(j));
      if (count % 3 === 0 && count !== 0 && str.charAt(j) !== '-') 
      {
        newStr = str.charAt(j) + "," + newStr;
      } 
      else {
        newStr = str.charAt(j) + newStr;
      }
      count++;
    }
    str = newStr + str.substr(str.indexOf("."), 3);
    return str;
  }
}

export function formatInt(data){
  console.log(data)
  return parseInt(data.replace(/,/g, ''))
}

export function formatClock(number) {
  var str = number.toString();
  var newStr = "";
  if(str.indexOf(".")===-1){
    newStr=str+":00";
  }
  else{
    newStr = str.substr(0, str.indexOf("."));
  }
  return newStr;
}

Date.prototype.format = function(fmt) {      
  var o = {         
    "M+" : this.getMonth()+1,                 //月份        
    "d+" : this.getDate(),                    //日         
    "h+" : this.getHours(),                   //小时         
    "m+" : this.getMinutes(),                 //分         
    "s+" : this.getSeconds(),                 //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S"  : this.getMilliseconds()             //毫秒     
  };     
  if(/(y+)/.test(fmt)) {            
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));      
  }     
  for(var k in o) {        
    if(new RegExp("("+ k +")").test(fmt)){             
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
    }    
  }    
  return fmt; 
}   


export function getNextMonthDay(date, monthNum) {
  var dateArr = date.split('/');
  var year = dateArr[0]; //获取当前日期的年份
  var month = dateArr[1]; //获取当前日期的月份
  var day = dateArr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中的月的天数
  var year2 = year;
  var month2 = parseInt(month) + parseInt(monthNum);
  if (month2 > 12) {
      year2 = parseInt(year2) + parseInt((parseInt(month2) / 12 == 0 ? 1 : parseInt(month2) / 12));
      month2 = parseInt(month2) % 12;
  }
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  var day2 = day;
  if (day2 > days2) {
      day2 = days2;
  }
  var t2 = year2 + '/' + month2 + '/' + day2;
  return t2;
}

export function getEngMonth(date,nextdate) {
  const engmonth = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  var dateArr = date.split('/');
  var year = dateArr[0]; //获取当前日期的年份
  var month = dateArr[1]; //获取当前日期的月份
  var day = dateArr[2]; //获取当前日期的日
  var nextdateArr = date.split('/');
  var nextday = nextdateArr[2]; //获取当前日期的日
  var first = engmonth[parseInt(month) % 12-1];
  var second = engmonth[(parseInt(month)+1) % 12-1];
  var third = engmonth[(parseInt(month)+2) % 12-1];
  var forth = engmonth[(parseInt(month)+3) % 12-1];
  var firstdays = new Date(year, month, 0);
  firstdays = firstdays.getDate(); //获取当前日期中的月的天数
  var firstday = firstdays - parseInt(day)+1;
  var seconddays = parseInt(month)+1>12 ? new Date(parseInt(year)+1,parseInt(month)-11,0):new Date(parseInt(year),parseInt(month)+1,0)
  var secondday = seconddays.getDate();
  var thirddays = parseInt(month)+2>12 ? new Date(parseInt(year)+1,parseInt(month)-10,0):new Date(parseInt(year),parseInt(month)+2,0)
  var thirdday = thirddays.getDate();
  var forthday = nextday;
  return {first,second,third,forth,firstday,secondday,thirdday,forthday}
}