import React, { Component } from 'react';
import { Table, Input, InputNumber, Tag, Button, Form, Switch, message, Select, Radio, DatePicker, Popconfirm } from "antd";
import moment from "moment";
import { formatInt } from 'utils/numbersHelpers';

class ModifyNewTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      columns: [],
    }
  }
  /**
   * 添加編輯按鈕
   */
  editRender = record => {
    return (
      <div>
      <a 
      onClick={() => this.handleEditClick(record)}
      ><img style={{ width: '15px',margin:'0 4px 0 ' }} src="/icons/edit.png"/>編輯</a>
      </div>
    )
  }
  /**
   * 添加刪除按鈕
   */
  deleteRender = record => {
    return (
      // <a 
      // href="javascript:;"
      // onClick={() => this.handleDeleteClick(record)}
      // >刪除</a>
      <Popconfirm title="確定刪除嗎?" onConfirm={() => this.handleDeleteClick(record)}>
      <a><img style={{ width: '15px',margin:'0 4px 0 ' }} src="/icons/delete.png"/>刪除</a>
    </Popconfirm>
    )
  }
  
  /**
   * 將數據保存在state中
   */
  componentWillMount(){
    let { columns } = this.props;
    if(columns[columns.length-1].fixed !== 'right'){
      columns.push({
        title: '操作',
        colSpan: 2,
        edit: true,
        render: this.editRender,
        // fixed: 'right',
      })
    }
    else{
      columns.pop()
      columns.push({
        title: '操作',
        colSpan: 2,
        edit: true,
        render: this.editRender,
      // fixed: 'right',
      })
    }
    columns.push({
      title: '操作',
      colSpan: 0,
      render: this.deleteRender,
      // fixed: 'right',
    })
    let len = columns.length;
    columns = columns.map((v, k) => {
      if(v.render){
        v.originRender = v.render; //保存原来的render，当编辑取消时可以恢复     
      }
      if(k === 0){
        // v.fixed = 'left';
      }
      if(k !== len){
        v.width = 130;
      }
      
      v.align = 'center'
      return v;
    })
    this.setState(() => ({
      columns
    }))
  }

  /**
   * 點擊編輯
   */
 handleEditClick = data => {
    let { columns } = this.state;
    columns = columns.map( v => {
      if(v.edit){
        v.render = (text, record) => {
          if(data.key === record.key){
            if( typeof text === 'object'){
              return this.editOtherRender(text);  //操作按钮变换
            }
            return this.otherRender(text, record, v); //渲染成指定的格式
          }else{
            return text;
          }
        }
      }
      return v;
    })
    this.setState(() => ({columns}));
  }
  /**
   * 點擊刪除
   */
  handleDeleteClick = data => {
    let { columns } = this.state;
    console.log(columns)
    console.log(data)
    this.props.deleteSuccess(data);//保存之後報數據傳出
}

  /**
   * 渲染成其他可编辑方式
   */
  otherRender = (text, record, column) => {
    const { form: { getFieldDecorator } } = this.props;
    const {editType, dataIndex } = column;
    if(editType && typeof editType === 'string'){
      switch (editType.toUpperCase()) {
        case 'INPUT':
          return getFieldDecorator(dataIndex, {initialValue: text})(<Input style={{width:120}} autoComplete='off'/>);
        case 'INPUTNUMBERINT':
          return getFieldDecorator(dataIndex, {initialValue: formatInt(text)})(
            <InputNumber 
            style={{width:120}} 
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')} 
            precision={0}
            autoComplete='off'/>
          );
        case 'DATEPICKER':
          return getFieldDecorator(dataIndex, { initialValue: moment(text, 'YYYY/MM/DD') })(<DatePicker />);
        case 'SWITCH':
          return  getFieldDecorator(dataIndex, 
            {
              initialValue: text && text.toUpperCase() === 'Y'? true : false, 
              valuePropName: 'checked',
            })(
            <Switch 
              checkedChildren='Y' 
              unCheckedChildren='N'
            />
          )
        default:
          return  getFieldDecorator(dataIndex, {initialValue: text})(<Input />);
      }
    }else if(editType && typeof editType === 'object'){
      switch (editType['type'].toUpperCase()) {
        case 'SELECT':
          return getFieldDecorator(dataIndex, {initialValue: text})(
          <Select>
            {this.renderItems(editType['content'], 'Select')}
          </Select>
          );
        case 'RADIO':
          return  getFieldDecorator(dataIndex, {initialValue: text})(
            <Radio.Group>
             {this.renderItems(editType['content'], 'Radio')}
            </Radio.Group>
          );
        default:
          return  getFieldDecorator(dataIndex, {initialValue: text})(<Input />);
      }
    }else{
      return  getFieldDecorator(dataIndex, {initialValue: text})(<Input />);
    }
    
  }
  /**
   * 编辑按钮
   */
  editOtherRender = text => {
    return (
      <div>
        <Button 
        type="primary" 
        size="small"
        onClick={() => this.handleEditSave(text)}
        >保存</Button>
        &nbsp;
        <Button 
          size="small"
          onClick={this.handleEditCancel}
        >取消</Button>
      </div>
    )
  }
  /**
   * 保存
   */
  handleEditSave = text => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      const columns = this.state.columns;
      for (const item of columns) {
        if(item.editType && typeof item.editType === 'string' && item.editType.toUpperCase() === 'SWITCH'){
            values[item.dataIndex] = values[item.dataIndex] ? 'Y' : 'N';
        }
      }
        for (const item of Object.values(values)) {
          if(item=== null ){
            message.warn('請填寫完整信息');
            return;
          }
          if (item <0){
            message.warn('請輸入正整數');
            return;
          }
          // if(item.indexOf(".")>-1){
          //   message.warn('請輸入整數');///1.23344  1.0
          //   return;
          // }
        }
        let data = {...text, ...values};
        this.props.saveSuccess(data);//保存之後報數據傳出
        this.handleEditCancel(); //恢復原狀
    });
  }
  /**
   * 取消编辑
   */
  handleEditCancel = () => {
    let { columns } = this.state;
    columns.map(v => {
      v.originRender ? v.render = v.originRender : v.render = null;
      return v;
    })
    this.setState(() => ({columns}))
  }

  /**
   * options
   */
  renderItems = (data, type) => {
    if(type === 'Select'){
      return data.map( v => (
        <Select.Option key={v}>{v}</Select.Option>
      ))
    }
    if(type === 'Radio'){
      return data.map( v => (
        <Radio key={v}>{v}</Radio>
      ))
    }
  }

  render(){
    const { columns } = this.state; 
    const scroll = this.props.scroll 
    // ? this.props.scroll : {x:1700}
    const pagination = this.props.pagination 
    return(
      <Table 
        dataSource={this.props.dataSource}
        columns={columns}
        scroll={scroll}
        pagination={pagination}
      />
    )
  }
}
  
export default Form.create()(ModifyNewTable) 