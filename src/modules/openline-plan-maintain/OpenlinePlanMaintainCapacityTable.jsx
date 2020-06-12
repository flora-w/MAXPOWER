import React,{useState} from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Row from 'antd/es/row';
import * as REDUCERS from 'constants/reducerNames';
import * as ACTIONS from 'constants/actionTypes';
import AuthMaintainTable from "./components/authMaintainTable";
import { getOpenlinePlanMaintainCapacityData } from './OpenlinePlanMaintainSelectors';

const useStyles = makeStyles({
    root: {
      margin:'50px 0 20px 10px'
    }
  });
  
  function OpenlinePlanMaintainCapacityTable({
    capacity_data,saveOpenlinePlanMaintainCapacity,deleteOpenlinePlanMaintainCapacity
  }) {
    const classes = useStyles();
    const columns = [
        { title: 'Fab', dataIndex: 'fab', edit: false },
        { title: '機種', dataIndex: 'model', edit: false },
        { title: 'STD output', dataIndex: 'std', edit: true, editType: 'INPUTNUMBERINT' },
      ]
      const pagination = true
      const scroll = false
    return (
      <Row className={classes.root}>
        <AuthMaintainTable
            tableData={capacity_data}
            columns={columns}
            saveAuth={saveOpenlinePlanMaintainCapacity}
            deleteAuth = {deleteOpenlinePlanMaintainCapacity}
            scroll={scroll}
            rowKey="key"
            pagination = {pagination}
        />
      </Row>
    );
  }

  const saveOpenlinePlanMaintainCapacityAction = (row, table)=>({
    type: ACTIONS.SAVE_OPENLINE_PLAN_MAINTAIN_CAPACITY,
    target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
    row, table
  })
  const deleteOpenlinePlanMaintainCapacityAction = (row, table)=>({
    type: ACTIONS.DELETE_OPENLINE_PLAN_MAINTAIN_CAPACITY,
    target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
    row, table
  })
 
  const mapStateToProps = (state, props) => ({
    ...getOpenlinePlanMaintainCapacityData(state, props),
  });

  const mapDispatchToProps = (dispatch) => ({
    saveOpenlinePlanMaintainCapacity:(row, table)=>dispatch(saveOpenlinePlanMaintainCapacityAction(row, table)),
    deleteOpenlinePlanMaintainCapacity:(row, table)=>dispatch(deleteOpenlinePlanMaintainCapacityAction(row, table)), 
  })
  
  export default connect(mapStateToProps,mapDispatchToProps)(OpenlinePlanMaintainCapacityTable);