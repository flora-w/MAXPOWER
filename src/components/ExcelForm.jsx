import React from 'react';
import ReactDOM from 'react-dom';
import jexcel from 'jexcel';

export default class ExcelForm extends React.Component {
  constructor(props) {
    super(props);
    const { data = [], onCellChange } = props;
    const len = data.length;
    this.options = {
      data,
      minDimensions: [len, 2],
      columns: [],
      onbeforechange: (instance, cell, col, row, value) => {
        if (Number(row) === 1) {
          const val = Number(value.replace(/,/g, ''));
          if (isNaN(val)) {
            return 0;
          }
          return val;
        }
        return value;
      },
      onchange: (instance, cell, col, row, value) => {
        onCellChange(this.el.getColumnData(col));
      },
    };
  }

  componentDidMount() {
    this.el = jexcel(ReactDOM.findDOMNode(this).children[0], this.options);
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
