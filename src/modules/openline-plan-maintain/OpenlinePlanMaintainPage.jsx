import React from 'react';
import { connect } from 'react-redux';
import Row from 'antd/es/row';
import Select from 'antd/es/select';
import { makeStyles } from '@material-ui/styles';
import * as REDUCERS from 'constants/reducerNames';
import * as ACTIONS from 'constants/actionTypes';
import { Tabs } from 'antd';
import OpenlinePlanMaintainLineTable from './OpenlinePlanMaintainLineTable';
import OpenlinePlanMaintainLineUpload from './OpenlinePlanMaintainLineUpload';
import OpenlinePlanMaintainStockUpload from './OpenlinePlanMaintainStockUpload';
import OpenlinePlanMaintainStockTable from './OpenlinePlanMaintainStockTable';
import OpenlinePlanMaintainCapacityUpload from './OpenlinePlanMaintainCapacityUpload';
import OpenlinePlanMaintainCapacityTable from './OpenlinePlanMaintainCapacityTable';
import OpenlinePlanMaintainFcstUpload from './OpenlinePlanMaintainFcstUpload';
import OpenlinePlanMaintainFsctTable from './OpenlinePlanMaintainFsctTable';

const { TabPane } = Tabs;
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

function OpenlinePlanMaintainPage({ category, setOpenlinePlanMaintainCategory }) {
  const classes = useStyles();
  function callback(key) {
    console.log(key);
    setOpenlinePlanMaintainCategory(key);
  }
  console.log(category)
  return (
    <Row className={classes.root}>
      <Tabs defaultActiveKey={category} onChange={callback}>
        <TabPane tab="線體機種" key="line">
          <OpenlinePlanMaintainLineUpload/>
          <OpenlinePlanMaintainLineTable/>
        </TabPane>
        <TabPane tab="期末庫存" key="stock">
          <OpenlinePlanMaintainStockUpload/>
          <OpenlinePlanMaintainStockTable/>
        </TabPane>
        <TabPane tab="標準產能" key="capacity">
          <OpenlinePlanMaintainCapacityUpload/>
          <OpenlinePlanMaintainCapacityTable/>
        </TabPane>
        <TabPane tab="FCST" key="fcst">
          <OpenlinePlanMaintainFcstUpload/>
          <OpenlinePlanMaintainFsctTable/>
        </TabPane>
      </Tabs>
    </Row>
  );
}

const setOpenlinePlanMaintainCategoryAction = (data)=>({
  type: ACTIONS.SET_OPENLINE_PLAN_MAINTAIN_CATEGORY,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const mapStateToProps = state => ({
  ...state.OpenlinePlanMaintain,
});

const mapDispatchToProps = dispatch => ({
  setOpenlinePlanMaintainCategory:(data)=>dispatch(setOpenlinePlanMaintainCategoryAction(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(OpenlinePlanMaintainPage);
