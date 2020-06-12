import React from 'react';
import ReactDOM from 'react-dom';
import jexcel from 'jexcel';

export default class ExcelForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.newdata)
    // const { data = [], onCellChange } = props;
    // const len = data.length;

    this.options = 
    {
      data:props.newdata.data,
      minDimensions: props.newdata.minDimensions,
      columns: [
        {
            type: 'text',
            readOnly:true,
        },
        {
            type: 'text',
        },
        {
            type: 'text',
        },
        {
            type: 'text',
        },
      ],
      updateTable: function(el, cell, x, y, source, value, id) {
        if (x == 0 && y == 0) {
            cell.classList.remove('readonly');
        }
      } ,
      colHeaders:props.newdata.colHeaders,
      // colWidths: [150, 150, 150, 150],
      allowInsertRow:false,
      allowInsertColumn:false,
      tableOverflow:true,
      tableHeight:props.newdata.tableHeight,
      tableWidth:props.newdata.tableWidth,
      style: {
        A1:'background-color: orange;',
        B1:'background-color: orange;',
      },
      nestedHeaders:props.newdata.nestedHeaders,
      onbeforechange: (instance, cell, col, row, value) => {
        // if (Number(row) === 1) {
        //   const val = Number(value.replace(/,/g, ''));
        //   if (isNaN(val)) {
        //     return 0;
        //   }

        //   return val;
        // }

        return value;
      },
      onchange: (instance, cell, col, row, value) => {
        console.log(this.options.data)
        console.log(this.el.getColumnData(col))
        // onCellChange(this.el.getColumnData(col));
        // this.el.getColumnData()
        const newdata = this.options.data;
        console.log(newdata)
        this.props.setNewData(newdata)
      },
    };
  }

  componentDidMount() {
    this.el = jexcel(ReactDOM.findDOMNode(this).children[0], this.options);
    
    // disable insert row and col and sort
    this.el.insertRow = () => {};
    this.el.insertColumn = () => {};
    this.el.orderBy = () => {};
  }

  render() {
    return (
      <div className="excel-form-container dbl-margin-top">
        <div></div>
      </div>
    );
  }
}
