import React from 'react';
import { connect } from 'react-redux';
import { getHeight } from '../modules/atten-i-mana/AttenIManaSelectors';
import Row from 'antd/es/row';
import { makeStyles } from '@material-ui/styles';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/markLine';
import VisibilityContainer from './VisibilityContainer';

const useStyles = makeStyles({
  root: {
    height: ({ height, minHeight }) => height || minHeight || 300,
  },
});

function NewVisibilityChartContainer({ height, ...restProps }) {
  const classes = useStyles(height);
  return (
    <Row className={classes.root}>
      <VisibilityContainer>
        <ReactEchartsCore echarts={echarts} style={height} {...restProps} />
      </VisibilityContainer>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  height: getHeight(state)
})

export default connect(mapStateToProps,null)(NewVisibilityChartContainer);
