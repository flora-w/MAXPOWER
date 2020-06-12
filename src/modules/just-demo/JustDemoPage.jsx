import React from 'react';
import { connect } from 'react-redux';
import Row from 'antd/es/row';
import { makeStyles } from '@material-ui/styles';

import { getQuarterlySeries } from './JustDemoSelectors';
import { getBenchmark, getUnit } from 'appSelectors';

import * as COLORS from 'constants/colors';


const useStyles = makeStyles({
  root: {
    margin: '30px 0',
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
    paddingLeft: 12,
    borderLeft: `3px solid ${COLORS.GREEN}`,
  },
  subtitle: {
    color: COLORS.LIGHT_BLUE,
    fontSize: 14,
    marginLeft: 12,
  },
});

function JustDemoPage({ benchmark  }) {
  const classes = useStyles();
  return (
    <Row className={classes.root}>
      <Row className={classes.title}>
        Population Ratio
        <span className={classes.subtitle}>vs. All of Japan</span>
      </Row>
      <Row>
          <Row className={classes.title}>
            {benchmark}
          </Row>
          <br/>
      </Row>
    </Row>
  );
}

const mapStateToProps = state => ({
  unit: getUnit(state),
  benchmark: getBenchmark(state),
  quarterlySeriesData: getQuarterlySeries(state),
});

export default connect(mapStateToProps)(JustDemoPage);
