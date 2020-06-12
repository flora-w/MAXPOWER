import React from 'react';
import { connect } from 'react-redux';
import Row from 'antd/es/row';
import { makeStyles } from '@material-ui/styles';
import JExcelForm from 'components/JExcelForm';
import { jexceldata, getOpenlinePlanShowData } from './OpenlinePlanShowSelectors';
import * as REDUCERS from 'constants/reducerNames';
import * as ACTIONS from 'constants/actionTypes';

const useStyles = makeStyles({
  root: {
    margin: '30px 0',
  }
});

function OpenlinePlanShowPage({ benchmark, openlineplanshowdata  }) {
  const classes = useStyles();
  const setNewData = (data)=>{
    console.log(data) 
  }

  return (
    <Row className={classes.root}>
      openlineplanshowpage
    <JExcelForm newdata={openlineplanshowdata} setNewData={setNewData}/>
    </Row>
  );
}

const mapStateToProps = state => ({
    openlineplanshowdata:getOpenlinePlanShowData(state)
});

const mapDispatchToProps = dispatch => ({
    
  });

export default connect(mapStateToProps,mapDispatchToProps)(OpenlinePlanShowPage);
