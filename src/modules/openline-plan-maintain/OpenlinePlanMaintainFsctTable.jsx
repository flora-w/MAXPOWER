import React,{useState} from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Row from 'antd/es/row';
import * as REDUCERS from 'constants/reducerNames';
import * as ACTIONS from 'constants/actionTypes';
import { MergeCellsTable } from "../../components/table";
import { getOpenlinePlanMaintainFsctData } from './OpenlinePlanMaintainSelectors';

const useStyles = makeStyles({
    root: {
      margin:'50px 0 20px 10px'
    }
  });
  
  function OpenlinePlanMaintainCapacityTable({
    fsct_data,columns,mergeItems
  }) {
        console.log(fsct_data,columns,mergeItems)
    const classes = useStyles();
    return (
      <Row className={classes.root}>
        <MergeCellsTable
          data={fsct_data}
          columns={columns}
          mergeItems={mergeItems}
        />
      </Row>
    );
  }
 
  const mapStateToProps = (state, props) => ({
    ...getOpenlinePlanMaintainFsctData(state, props),
  });

  const mapDispatchToProps = (dispatch) => ({})
  
  export default connect(mapStateToProps,mapDispatchToProps)(OpenlinePlanMaintainCapacityTable);