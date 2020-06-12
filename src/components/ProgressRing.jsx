import React from 'react';
import merge from 'lodash/merge';
import VisibilityChartContainer from './VisibilityChartContainer';
import * as COLORS from 'constants/colors';
import getPieChartOption from 'metadata/chart-options/pie';
import { toPrecision } from 'utils/numbersHelpers';
export default function ProgressRing({
  value,
  benchmark,
  style = {},
  extraOption = {},
}) {
  const subtitle = benchmark === 'History' ? 'Growth Rate' : 'achieved';
  const title = {
    text: `${toPrecision(1)(value)}%`,
    subtext: subtitle,
    y: 75,
    textStyle: {
      color: COLORS.WHITE,
      fontWeight: 'normal',
      fontSize: 28,
    },
    subtextStyle: {
      color: COLORS.LIGHT_BLUE,
      fontSize: 12,
    },
  };

  const lessThanZero = value < 0;
  const absValue = Math.abs(value);
  const overOneHundred = absValue > 100;
  const noValue = isNaN(absValue);
  const dist = {
    class1: noValue ? 0 : overOneHundred ? 100 : absValue,
    class2: noValue ? 100 : overOneHundred ? 0 : 100 - absValue,
  };

  const baseOption = getPieChartOption({
    dist,
    color: [lessThanZero ? COLORS.RED : COLORS.GREEN, COLORS.GREY_DARK],
  });

  const customOption = {
    title,
    series: {
      radius: ['60%', '90%'],
    },
  };

  const option = merge(baseOption, customOption);
  const nextOption = merge(option, extraOption);
  return (
    <VisibilityChartContainer
      style={{ height: 200, ...style }}
      option={nextOption}
      notMerge={true}
    />
  );
}
