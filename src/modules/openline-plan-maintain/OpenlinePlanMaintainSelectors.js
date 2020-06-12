import { createDeepEqualSelector } from 'utils/reselectHelpers';
import { formatNum } from 'utils/numbersHelpers';

export const getOpenlinePlanMaintainLineData = createDeepEqualSelector(state => ({ ...state.OpenlinePlanMaintain}),
({ line_data }) => {
  return {line_data}
})

export const getOpenlinePlanMaintainStockData = createDeepEqualSelector(state => ({ ...state.OpenlinePlanMaintain}),
({ stock_data }) => {
  const data = []
  stock_data.map ((item)=>{
    console.log(item)
    data.push({
      key: item.key,
      month:item.month,
      fab:item.fab,
      model:item.model,
      stock:formatNum(item.stock)
    })
  })
  return {stock_data:data}
})

export const getOpenlinePlanMaintainCapacityData = createDeepEqualSelector(state => ({ ...state.OpenlinePlanMaintain}),
({ capacity_data }) => {
  const data = []
  capacity_data.map ((item)=>{
    console.log(item)
    data.push({
      key: item.key,
      fab:item.fab,
      model:item.model,
      std:formatNum(item.std)
    })
  })
  return {capacity_data:data}
})

export const getOpenlinePlanMaintainFsctData = createDeepEqualSelector(state => ({ ...state.OpenlinePlanMaintain}),
({ fsct_data }) => {
  const data = [];
  const mergeItems = ['item'];
  const columns = [{
    title: 'Item',
    dataIndex: 'item',
    align:"center",
  },{
    title: 'Fab',
    dataIndex: 'fab',
    align:"center",
  },{
    title: 'Model',
    dataIndex: 'model',
    align:"center",
  }];
  var key;
  const engmonth = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const len = fsct_data.length;
  var yearmonth;
  var newyearmonth;
  if(len>0){
    for( key in fsct_data[1]){
      console.log(key)
      if(key.substring(0,3)!=="ite"&&key.substring(0,3)!=="fab"&&key.substring(0,3)!=="mod")
      {
        switch (key.substring(0,3)){
          case engmonth[0]:
            yearmonth = key.substring(3,5) + "01";
            data.push(yearmonth)
            break;
          case engmonth[1]:
            yearmonth = key.substring(3,5) + "02";
            data.push(yearmonth)
            break;
          case engmonth[2]:
            yearmonth = key.substring(3,5) + "03";
            data.push(yearmonth)
            break;
          case engmonth[3]:
            yearmonth = key.substring(3,5) + "04";
            data.push(yearmonth)
            break;
          case engmonth[4]:
            yearmonth = key.substring(3,5) + "05";
            data.push(yearmonth)
            break;
          case engmonth[5]:
            yearmonth = key.substring(3,5) + "06";
            data.push(yearmonth)
            break;
          case engmonth[6]:
            yearmonth = key.substring(3,5) + "07";
            data.push(yearmonth)
            break;
          case engmonth[7]:
            yearmonth = key.substring(3,5) + "08";
            data.push(yearmonth)
            break;
          case engmonth[8]:
            yearmonth = key.substring(3,5) + "09";
            data.push(yearmonth)
            break;
          case engmonth[9]:
            yearmonth = key.substring(3,5) + "10";
            data.push(yearmonth)
            break;
          case engmonth[10]:
            yearmonth = key.substring(3,5) + "11";
            data.push(yearmonth)
            break;
          case engmonth[11]:
            yearmonth = key.substring(3,5) + "12";
            data.push(yearmonth)
            break;
        }
      }
    }
    // const olddata = [...data];
    data.sort().map((item)=>{
      switch (item.substring(2,4)){
        case "01":
          newyearmonth = engmonth[0] + item.substring(0,2);
          break;
        case "02":
          newyearmonth = engmonth[1] + item.substring(0,2);
          break;
        case "03":
          newyearmonth = engmonth[2] + item.substring(0,2);
          break;
        case "04":
          newyearmonth = engmonth[3] + item.substring(0,2);
          break;
        case "05":
          newyearmonth = engmonth[4] + item.substring(0,2);
          break;
        case "06":
          newyearmonth = engmonth[5] + item.substring(0,2);
          break;
        case "07":
          newyearmonth = engmonth[6] + item.substring(0,2);
          break;
        case "08":
          newyearmonth = engmonth[7] + item.substring(0,2);
          break;
        case "09":
          newyearmonth = engmonth[8] + item.substring(0,2);
          break;
        case "10":
          newyearmonth = engmonth[9] + item.substring(0,2);
          break;
        case "11":
          newyearmonth = engmonth[10] + item.substring(0,2);
          break;
        case "12":
          newyearmonth = engmonth[11] + item.substring(0,2);
          break;
      }
      // console.log(newyearmonth,olddata.indexOf(item))
      // console.log(newdata,olddata)
      columns.push({
        title: newyearmonth,
        dataIndex: newyearmonth,
        align:"center",
      })
    })
  }
  return {fsct_data,columns,mergeItems}
})