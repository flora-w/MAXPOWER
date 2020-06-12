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
import { Input, InputNumber, Button } from 'antd';

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
  upload:{
    margin: '20px 0',
  }
});

function OpenlinePlanMaintainCapacityUpload({ capacity_fab, capacity_model, capacity_std, setOpenlinePlanMaintainCapacityFab, setOpenlinePlanMaintainCapacityModel, setOpenlinePlanMaintainCapacitySTD, uploadOpenlinePlanMaintainCapacity }) {
    const classes = useStyles();
    function handleToCapacityFab({target}){
        setOpenlinePlanMaintainCapacityFab(target.value);
    }
    function handleToCapacityModel({target}){
        setOpenlinePlanMaintainCapacityModel(target.value);
    } 
    function handleToCapacitySTD(value){
        setOpenlinePlanMaintainCapacitySTD(value);
    }
    function handleToCapacityUpload(){
        if(capacity_fab===""){
            message.error("please input fab")
        }
        else if(capacity_model===""){
            message.error("請輸入機種")
        }
        else if(capacity_std===""){
            message.error("please input STD output")
        } 
        else{
            uploadOpenlinePlanMaintainCapacity({ capacity_fab, capacity_model, capacity_std});
        }
    }    

  return (
    <Row className={classes.upload}>
        <Col span={3}><Input className={classes.input} value={cloneDeep(capacity_fab)}  placeholder="Fab" onChange={handleToCapacityFab}/></Col>
        <Col span={3}><Input className={classes.input} value={cloneDeep(capacity_model)}  placeholder="機種" onChange={handleToCapacityModel}/></Col>
        <Col span={3}>
            <InputNumber 
                className={classes.input} 
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')} 
                value={cloneDeep(capacity_std)}  
                placeholder="STD output" 
                onChange={handleToCapacitySTD}
                precision={0}
            />
        </Col>
        <Col span={2}>
            <Button className={classes.button} onClick={handleToCapacityUpload}>UPLOAD</Button>
        </Col>
        <Col></Col>
    </Row>      
  );
}

const setOpenlinePlanMaintainCapacityFabAction = (data) =>({
  type: ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_CAPACITY_FAB,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const setOpenlinePlanMaintainCapacityModelAction = (data) =>({
  type: ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_CAPACITY_MODEL,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const setOpenlinePlanMaintainCapacitySTDAction= (data) =>({
  type: ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_CAPACITY_STD,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const uploadOpenlinePlanMaintainCapacityAction= (data) =>({
  type: ACTIONS.UPLOAD_OPENLINE_PLAN_MAINTAIN_CAPACITY,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const mapStateToProps = state => ({
  ...state.OpenlinePlanMaintain,
});

const mapDispatchToProps = dispatch => ({
  setOpenlinePlanMaintainCapacityFab:(data)=>dispatch(setOpenlinePlanMaintainCapacityFabAction(data)),
  setOpenlinePlanMaintainCapacityModel: (data) => dispatch(setOpenlinePlanMaintainCapacityModelAction(data)),
  setOpenlinePlanMaintainCapacitySTD: (data) => dispatch(setOpenlinePlanMaintainCapacitySTDAction(data)),
  uploadOpenlinePlanMaintainCapacity:(data) => dispatch(uploadOpenlinePlanMaintainCapacityAction(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(OpenlinePlanMaintainCapacityUpload);
