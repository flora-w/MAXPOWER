import React, { useState } from 'react';
import { connect } from 'react-redux';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import * as REDUCERS from 'constants/reducerNames';
import * as ACTIONS from 'constants/actionTypes';
import * as KEYS from 'constants/elementKeys';
import layoutConfig from 'metadata/layoutConfig';
import { useDeepEqualEffect } from 'utils/useEffectHelpers';

const useStyles = makeStyles({
  header: {
    top:20
  }
});

function Header({
  activePage,
  setGlobalInfo,
  fetchData,
  version,
  from_date_time,
  to_date_time
}) {
  function getHeaderContent(){

  }

  const [queryParams] = useState({

  });

  const { title } = getHeaderContent() || {};
  const classes = useStyles();
  useDeepEqualEffect(() => {
    if (activePage.includes(KEYS.JUST_DEMO) ) {
      setGlobalInfo({ version: "admin" });
    }

    return fetchData({ targetPage: activePage, params: queryParams });
  }, [activePage,fetchData, setGlobalInfo]);

  const isAttenIManaPage =
      activePage.includes(KEYS.JUST_DEMO)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Row className="page-header">
        <Col {...layoutConfig}>
        <Row className={classes.header}>
            <Col span={5} className="font-18">
            Manpower X</Col>
            <Col span={18} className="font-16">
              {/* {isAttenIManaPage?"":"( "+from_date_time+" - "+to_date_time+" )"} */}
            </Col>
            <Col span={1} className="font-18">
              {/* {version} */}admin
            </Col>
          </Row>
        </Col>
      </Row>
    </MuiPickersUtilsProvider>
  );
}

const mapStateToProps = ({ globalInfo: { loading, lv2_code, ...rest } }) => ({
  ...rest,
});

const mapDispatchToProps = dispatch => ({
  setGlobalInfo: diffState =>
    dispatch({
      type: ACTIONS.SET_STATE,
      target: REDUCERS.GLOBAL_INFO,
      state: diffState,
    }),
  fetchData: ({ targetPage, params = null }) =>
    dispatch({
      params,
      targetPage,
      type: ACTIONS.FETCH_DATA,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
