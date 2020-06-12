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
import { Input, DatePicker, Button } from 'antd';

const dateFormat = 'YYYY-MM-DD';
const { Option } = Select;
const useStyles = makeStyles({
  root: {
    margin: '10px 0',
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

function OpenlinePlanMaintainLineUpload({ line_line,line_model,line_fromdate,line_todate,line_status, setOpenlinePlanMaintainLineLine, setOpenlinePlanMaintainLineModel, setOpenlinePlanMaintainLineFromDate, setOpenlinePlanMaintainLineToDate, setOpenlinePlanMaintainLineStatus,uploadOpenlinePlanMaintainLine }) {
  const classes = useStyles();

  function handleToLineLine({target}){
    setOpenlinePlanMaintainLineLine(target.value);
  } 

  function handleToLineModel({target}){
    setOpenlinePlanMaintainLineModel(target.value);
  } 

  function handleToLineFromDate(date,dateString){
    setOpenlinePlanMaintainLineFromDate(dateString);
  }
  function handleToLineToDate(date,dateString){
    console.log(date)
    console.log(dateString)
    setOpenlinePlanMaintainLineToDate(dateString);
  }
  function handleToLineStatus(key,prop){
    console.log(prop)
    const {props} = prop;
    const  linestatus = props.children;
    setOpenlinePlanMaintainLineStatus({key,linestatus});
  }

  function handleToLineUpload(){
    if(line_line===""){
        message.error("please input line")
    }
    else if(line_model===""){
      message.error("請輸入可生產機種")
    }
    else if(line_fromdate===""){
      message.error("請選擇開始日期")
    }
    else if(line_todate===""){
      message.error("請選擇結束日期")
    } 
    else{
      uploadOpenlinePlanMaintainLine({line_line,line_model,line_fromdate, line_todate,line_status});
    }
}    

  return (
    <Row className={classes.lineupload}>
        <Col span={3}><Input className={classes.input} value={cloneDeep(line_line)}  placeholder="Line" onChange={handleToLineLine}/></Col>
        <Col span={3}><Input className={classes.input} value={cloneDeep(line_model)}  placeholder="可生產機種" onChange={handleToLineModel}/></Col>
        <Col span={5}>
            <DatePicker  size="small" placeholder="開始日期" style={{width:110}} value={line_fromdate===""?null:moment(line_fromdate, dateFormat)} 
            format={dateFormat} onChange={handleToLineFromDate}/>
            <span className={classes.span}>—</span>
            <DatePicker  size="small" placeholder="結束日期" style={{width:110}} value={line_todate===""?null:moment(line_todate, dateFormat)} 
            format={dateFormat} onChange={handleToLineToDate}/>
        </Col>
        <Col span={4}>
            <Select id="select-status" size="small" style={{width:120}} value={line_status} onChange={handleToLineStatus}>
                <Option name="select-status-option" key="Y">正常</Option>
                <Option name="select-status-option" key="N">切線</Option>
            </Select>
        </Col>
        <Col span={2}>
            <Button className={classes.button} onClick={handleToLineUpload}>UPLOAD</Button>
        </Col>
        <Col></Col>
    </Row>      
  );
}

const setOpenlinePlanMaintainLineLineAction = (data) =>({
  type: ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_LINE_LINE,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const setOpenlinePlanMaintainLineModelAction = (data) =>({
  type: ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_LINE_MODEL,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const setOpenlinePlanMaintainLineFromDateAction = (data) =>({
  type: ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_LINE_FROMDATE,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const setOpenlinePlanMaintainLineToDateAction= (data) =>({
  type: ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_LINE_TODATE,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const setOpenlinePlanMaintainLineStatusAction= (data) =>({
  type: ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_LINE_STATUS,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const uploadOpenlinePlanMaintainLineAction= (data) =>({
  type: ACTIONS.UPLOAD_OPENLINE_PLAN_MAINTAIN_LINE,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const mapStateToProps = state => ({
  ...state.OpenlinePlanMaintain,
});

const mapDispatchToProps = dispatch => ({
  setOpenlinePlanMaintainLineLine:(data)=>dispatch(setOpenlinePlanMaintainLineLineAction(data)),
  setOpenlinePlanMaintainLineModel:(data)=>dispatch(setOpenlinePlanMaintainLineModelAction(data)),
  setOpenlinePlanMaintainLineFromDate: (data) => dispatch(setOpenlinePlanMaintainLineFromDateAction(data)),
  setOpenlinePlanMaintainLineToDate: (data) => dispatch(setOpenlinePlanMaintainLineToDateAction(data)),
  setOpenlinePlanMaintainLineStatus:(data) => dispatch(setOpenlinePlanMaintainLineStatusAction(data)),
  uploadOpenlinePlanMaintainLine:(data) => dispatch(uploadOpenlinePlanMaintainLineAction(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(OpenlinePlanMaintainLineUpload);
