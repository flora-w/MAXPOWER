import React,{useState} from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import * as REDUCERS from 'constants/reducerNames';
import * as ACTIONS from 'constants/actionTypes';
import AuthMaintainTable from "./components/authMaintainTable";
import { getOpenlinePlanMaintainStockData } from './OpenlinePlanMaintainSelectors';

const useStyles = makeStyles({
    root: {
      margin:'50px 0 20px 10px'
    }
  });
  
  function OpenlinePlanMaintainStockTable({
    stock_data,saveOpenlinePlanMaintainStock,deleteOpenlinePlanMaintainStock
  }) {
    const classes = useStyles();
    const columns = [
        { title: '月份', dataIndex: 'month', edit: false },
        { title: 'Fab', dataIndex: 'fab', edit: false },
        { title: '機種', dataIndex: 'model', edit: false },
        { title: '庫存', dataIndex: 'stock', edit: true, editType: 'INPUTNUMBERINT' },
      ]
      const pagination = true
      const scroll = false
    return (
      <Row className={classes.root}>
        <AuthMaintainTable
            tableData={stock_data}
            columns={columns}
            saveAuth={saveOpenlinePlanMaintainStock}
            deleteAuth = {deleteOpenlinePlanMaintainStock}
            scroll={scroll}
            rowKey="key"
            pagination = {pagination}
        />
      </Row>
    );
  }

  const saveOpenlinePlanMaintainStockAction = (row, table)=>({
    type: ACTIONS.SAVE_OPENLINE_PLAN_MAINTAIN_STOCK,
    target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
    row, table
  })
  const deleteOpenlinePlanMaintainStockAction = (row, table)=>({
    type: ACTIONS.DELETE_OPENLINE_PLAN_MAINTAIN_STOCK,
    target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
    row, table
  })
 
  const mapStateToProps = (state, props) => ({
    ...getOpenlinePlanMaintainStockData(state, props),
  });

  const mapDispatchToProps = (dispatch) => ({
    saveOpenlinePlanMaintainStock:(row, table)=>dispatch(saveOpenlinePlanMaintainStockAction(row, table)),
    deleteOpenlinePlanMaintainStock:(row, table)=>dispatch(deleteOpenlinePlanMaintainStockAction(row, table)), 
  })
  
  export default connect(mapStateToProps,mapDispatchToProps)(OpenlinePlanMaintainStockTable);