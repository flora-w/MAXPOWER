import * as COLORS from 'constants/colors';

export default benchmark => series => {
  const name = series.name.toLowerCase();
  series.itemStyle = { color: COLORS.GREY };

  if (name.includes('simulated')) {
    series.lineStyle = { type: 'dashed' };
    series.itemStyle = {
      color: COLORS[benchmark.toUpperCase()] || COLORS.TREND,
    };

    return;
  }

  if (name.includes('actual')) {
    series.itemStyle = { color: COLORS.ACTUAL };
    return;
  }

  if (name.includes('budget')) {
    series.itemStyle = { color: COLORS.BUDGET };
    return;
  }

  if (name.includes('r3m')) {
    series.itemStyle = { color: COLORS.R3M };
    return;
  }

  if (name.includes('history')) {
    series.itemStyle = { color: COLORS.HISTORY };
    return;
  }

  if (name.includes('gap')) {
    series.itemStyle = { color: COLORS.GAP };
    return;
  }
};
