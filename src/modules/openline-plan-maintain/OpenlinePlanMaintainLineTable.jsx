import React,{useState} from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import * as REDUCERS from 'constants/reducerNames';
import * as ACTIONS from 'constants/actionTypes';
import AuthMaintainTable from "./components/authMaintainTable";
import { getOpenlinePlanMaintainLineData } from './OpenlinePlanMaintainSelectors';

const useStyles = makeStyles({
    root: {
      margin:'50px 0 20px 10px'
    }
  });
  
  function OpenlinePlanMaintainLineTable({
    line_data,saveOpenlinePlanMaintainLine,deleteOpenlinePlanMaintainLine
  }) {
    const classes = useStyles();
    console.log(line_data)
    const columns = [
        { title: 'Line', dataIndex: 'line', edit: false},
        { title: '可生產機種', dataIndex: 'model', edit: false },
        { title: '開始日期', dataIndex: 'fromdate', edit: true, editType: 'DATEPICKER' },
        { title: '結束日期', dataIndex: 'todate', edit: true, editType: 'DATEPICKER' },
        { title: '狀態', dataIndex: 'status', edit: true, editType: {type:'SELECT',content:["正常","切線"]}  },
        // {title: '是否有效', dataIndex: 'IsValid', edit: true, editType: 'switch'},
      ]
      const pagination = true
      const scroll = false
    return (
      <Row className={classes.root}>
        <AuthMaintainTable
            tableData={line_data}
            columns={columns}
            saveAuth={saveOpenlinePlanMaintainLine}
            deleteAuth = {deleteOpenlinePlanMaintainLine}
            scroll={scroll}
            rowKey="key"
            pagination = {pagination}
        />
      </Row>
    );
  }

  const saveOpenlinePlanMaintainLineAction = (row, table)=>({
    type: ACTIONS.SAVE_OPENLINE_PLAN_MAINTAIN_LINE,
    target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
    row, table
  })
  const deleteOpenlinePlanMaintainLineAction = (row, table)=>({
    type: ACTIONS.DELETE_OPENLINE_PLAN_MAINTAIN_LINE,
    target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
    row, table
  })
 
  const mapStateToProps = (state, props) => ({
    ...getOpenlinePlanMaintainLineData(state, props),
  });

  const mapDispatchToProps = (dispatch) => ({
    saveOpenlinePlanMaintainLine:(row, table)=>dispatch(saveOpenlinePlanMaintainLineAction(row, table)),
    deleteOpenlinePlanMaintainLine:(row, table)=>dispatch(deleteOpenlinePlanMaintainLineAction(row, table)), 
  })
  
  export default connect(mapStateToProps,mapDispatchToProps)(OpenlinePlanMaintainLineTable);