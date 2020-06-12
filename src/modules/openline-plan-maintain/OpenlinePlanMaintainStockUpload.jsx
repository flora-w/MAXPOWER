import React from 'react';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Select from 'antd/es/select';
import message from 'antd/es/message';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import * as REDUCERS from 'constants/reducerNames';
import * as ACTIONS from 'constants/actionTypes';
import { Input, InputNumber, DatePicker, Button } from 'antd';

const MonthPicker = DatePicker.MonthPicker;
const dateFormat = 'YYYY-MM';
const { Option } = Select;
const useStyles = makeStyles({
  root: {
    margin: '10px 0',
  },
  monthchoose:{
    margin:'0 10px',
  },
  input:{
    margin:'0 10px',
    width:120,
    height:25,
    border:'solid 1px white'
  },
  span:{
    padding:'0 5px 0 5px',
  },
  button:{
    height:25,
    margin:'0 10px',
  },
  lineupload:{
    margin: '20px 0',
  }
});

function OpenlinePlanMaintainStockUpload({ stock_month,stock_fab,stock_model,stock_stock, setOpenlinePlanMaintainStockMonth, setOpenlinePlanMaintainStockFab, setOpenlinePlanMaintainStockModel, setOpenlinePlanMaintainStockStock, uploadOpenlinePlanMaintainStock }) {
    const classes = useStyles();
    function handleToStockMonth(date,dateString){
        console.log(date)
        console.log(dateString)
        setOpenlinePlanMaintainStockMonth(dateString);
    }
    function handleToStockFab({target}){
        setOpenlinePlanMaintainStockFab(target.value);
    }
    function handleToStockModel({target}){
        setOpenlinePlanMaintainStockModel(target.value);
    } 
    function handleToStockStock(value){
        setOpenlinePlanMaintainStockStock(value);
    }
    function handleToStockUpload(){
        if(stock_month===""){
            message.error("請選擇月份")
        }
        else if(stock_fab===""){
            message.error("please input fab")
        }
        else if(stock_model===""){
            message.error("請輸入機種")
        }
        else if(stock_stock===""){
            message.error("請輸入庫存")
        } 
        else{
            uploadOpenlinePlanMaintainStock({stock_month, stock_fab, stock_model, stock_stock});
        }
    }    

  return (
    <Row className={classes.lineupload}>
        <Col span={2} className={classes.monthchoose}><MonthPicker size="small" style={{width:100}} placeholder='月份' value={stock_month===""?null:moment(stock_month, dateFormat)} onChange={handleToStockMonth}/></Col>
        <Col span={3}><Input className={classes.input} value={cloneDeep(stock_fab)}  placeholder="Fab" onChange={handleToStockFab}/></Col>
        <Col span={3}><Input className={classes.input} value={cloneDeep(stock_model)}  placeholder="機種" onChange={handleToStockModel}/></Col>
        <Col span={3}>
            <InputNumber 
                className={classes.input} 
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')} 
                value={cloneDeep(stock_stock)}  
                placeholder="庫存" 
                onChange={handleToStockStock}
                precision={0}
            />
        </Col>
        <Col span={2}>
            <Button className={classes.button} onClick={handleToStockUpload}>UPLOAD</Button>
        </Col>
        <Col></Col>
    </Row>      
  );
}

const setOpenlinePlanMaintainStockMonthAction = (data) =>({
  type: ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_STOCK_MONTH,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const setOpenlinePlanMaintainStockFabAction = (data) =>({
  type: ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_STOCK_FAB,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const setOpenlinePlanMaintainStockModelAction = (data) =>({
  type: ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_STOCK_MODEL,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const setOpenlinePlanMaintainStockStockAction= (data) =>({
  type: ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_STOCK_STOCK,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const uploadOpenlinePlanMaintainStockAction= (data) =>({
  type: ACTIONS.UPLOAD_OPENLINE_PLAN_MAINTAIN_STOCK,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const mapStateToProps = state => ({
  ...state.OpenlinePlanMaintain,
});

const mapDispatchToProps = dispatch => ({
  setOpenlinePlanMaintainStockMonth:(data)=>dispatch(setOpenlinePlanMaintainStockMonthAction(data)),
  setOpenlinePlanMaintainStockFab:(data)=>dispatch(setOpenlinePlanMaintainStockFabAction(data)),
  setOpenlinePlanMaintainStockModel: (data) => dispatch(setOpenlinePlanMaintainStockModelAction(data)),
  setOpenlinePlanMaintainStockStock: (data) => dispatch(setOpenlinePlanMaintainStockStockAction(data)),
  uploadOpenlinePlanMaintainStock:(data) => dispatch(uploadOpenlinePlanMaintainStockAction(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(OpenlinePlanMaintainStockUpload);
