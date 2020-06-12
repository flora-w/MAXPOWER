import React from 'react';
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

export default function VisibilityChartContainer({ style = {}, ...restProps }) {
  const classes = useStyles(style);
  return (
    <Row className={classes.root}>
      <VisibilityContainer>
        <ReactEchartsCore echarts={echarts} style={style} {...restProps} />
      </VisibilityContainer>
    </Row>
  );
}
