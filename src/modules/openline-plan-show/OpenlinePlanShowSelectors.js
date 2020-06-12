import { createDeepEqualSelector } from 'utils/reselectHelpers';
import { getNextMonthDay,getEngMonth } from 'utils/numbersHelpers';

export const getOpenlinePlanShowData = createDeepEqualSelector(state => ({ ...state.OpenlinePlanShow}),
({ line }) => {
  const windows_width = document.body.clientWidth- 200;
  const changewidth = windows_width + "px";
  console.log(line)
  var dateList = [];
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  const startDate = year + '/' + month + '/' + day;
  const endDate = getNextMonthDay(year + '/' + month + '/' + day,3);
  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);
  while ((endDateTime.getTime() - startDateTime.getTime()) >= 0) {
    let month = startDateTime.getMonth() + 1;
    let day = startDateTime.getDate();
    dateList.push(month + "/" + day);
    startDateTime.setDate(startDateTime.getDate() + 1);
  }
  console.log(startDateTime,endDate,dateList)
  const eng = getEngMonth(startDate,endDate)
  console.log(eng)
  return {
    data:[],
    minDimensions:[dateList.length+4,100],
    // minDimensions: [4, 2],
    // columns: [],
    colHeaders:["-","CGL","Current",...dateList],
    tableHeight:'500px',
    tableWidth:changewidth,
    nestedHeaders:[
      [
        { title:'', colspan:'3' },
        { title:eng.first, colspan:eng.firstday },
        { title:eng.second, colspan:eng.secondday },
        { title:eng.third, colspan:eng.thirdday },
        { title:eng.forth, colspan:eng.forthday }
      ],
    ]
    // colWidths: [150, 150, 150, 150],
    // onbeforechange: (instance, cell, col, row, value) => {
    //   if (Number(row) === 1) {
    //     const val = Number(value.replace(/,/g, ''));
    //     if (isNaN(val)) {
    //       return 0;
    //     }
  
    //     return val;
    //   }
  
    //   return value;
    // },
    // onchange: (instance, cell, col, row, value) => {
    //   console.log(col)
    //   console.log(this.el.getColumnData(col))
    //   // onCellChange(this.el.getColumnData(col));
    //   this.el.getColumnData()
    // },
  };

})

export const jexceldata = {
  data:[],
  // // minDimensions: [len, 2],
  // minDimensions: [4, 2],
  // columns: [],
  colHeaders:["id12","name","empno","dept"],
  tableHeight:'500px',
  tableWidth:'1000px',
  // colWidths: [150, 150, 150, 150],
  // onbeforechange: (instance, cell, col, row, value) => {
  //   if (Number(row) === 1) {
  //     const val = Number(value.replace(/,/g, ''));
  //     if (isNaN(val)) {
  //       return 0;
  //     }

  //     return val;
  //   }

  //   return value;
  // },
  // onchange: (instance, cell, col, row, value) => {
  //   console.log(col)
  //   console.log(this.el.getColumnData(col))
  //   // onCellChange(this.el.getColumnData(col));
  //   this.el.getColumnData()
  // },
};