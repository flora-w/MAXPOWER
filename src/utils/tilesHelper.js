import { unitFormat } from './numbersHelpers';

export const mapObjectToTiles = data => {
  return Object.keys(data).map(name => {
    const originValue = data[name];

    const { unit, value } = unitFormat(originValue);
    const suffix = unit;

    switch (name) {
      // kpi overview
      case 'rev':
        return { name, title: 'Revenue', value, prefix: '$', suffix };

      case 'mva':
        return { name, title: 'MVA', value, prefix: '$', suffix };

      case 'oi':
        return { name, title: 'Operating Income', value, prefix: '$', suffix };

      case 'sales':
        return {
          name,
          title: 'Sales Volume',
          value,
          precision: 1,
          prefix: '',
          suffix,
        };

      case 'scrap':
        return {
          name,
          title: 'Scrap %',
          value,
          precision: 1,
          prefix: '',
          suffix,
        };

      // health
      case 'ship':
        return {
          name,
          title: 'Invoice Qty',
          value:
            typeof originValue['kpi_val'] == 'number'
              ? (originValue['kpi_val'] * 100).toFixed(1)
              : '-',
          value_prev:
            typeof originValue['kpi_val_prev'] == 'number'
              ? (originValue['kpi_val_prev'] * 100).toFixed(1)
              : '-',
          suffix: '%',
          vs_prev:
            originValue['kpi_val'] > originValue['kpi_val_prev']
              ? 'up'
              : originValue['kpi_val'] < originValue['kpi_val_prev']
              ? 'down'
              : '',
          vs_target:
            originValue['kpi_val'] === 1
              ? ''
              : originValue['kpi_val'] > 1
              ? 'up'
              : 'down',
          secondLine: 'vs. APR',
          summary: `${originValue['target_proj_num']}/${
            originValue['all_proj_num']
          } MP projects above APR`,
        };

      case 'prod':
        return {
          name,
          title: 'Production Qty',
          value:
            typeof originValue['kpi_val'] == 'number'
              ? (originValue['kpi_val'] * 100).toFixed(1)
              : '-',
          value_prev:
            typeof originValue['kpi_val_prev'] == 'number'
              ? (originValue['kpi_val_prev'] * 100).toFixed(1)
              : '-',
          suffix: '%',
          vs_prev:
            originValue['kpi_val'] > originValue['kpi_val_prev']
              ? 'up'
              : originValue['kpi_val'] < originValue['kpi_val_prev']
              ? 'down'
              : '',
          vs_target:
            originValue['kpi_val'] === 1
              ? ''
              : originValue['kpi_val'] > 1
              ? 'up'
              : 'down',
          secondLine: 'vs. APR',
          summary: `${originValue['target_proj_num']}/${
            originValue['all_proj_num']
          } MP projects above APR`,
        };

      case 'moh':
        return {
          name,
          title: 'Unit MOH',
          value:
            typeof originValue['kpi_val'] == 'number'
              ? (originValue['kpi_val'] * 100).toFixed(1)
              : '-',
          value_prev:
            typeof originValue['kpi_val_prev'] == 'number'
              ? (originValue['kpi_val_prev'] * 100).toFixed(1)
              : '-',
          suffix: '%',
          vs_prev:
            originValue['kpi_val'] > originValue['kpi_val_prev']
              ? 'up'
              : originValue['kpi_val'] < originValue['kpi_val_prev']
              ? 'down'
              : '',
          vs_target:
            originValue['kpi_val'] === 1
              ? ''
              : originValue['kpi_val'] > 1
              ? 'down'
              : 'up',
          secondLine: 'quote',
          summary: `${originValue['target_proj_num']}/${
            originValue['all_proj_num']
          } MP projects within 10% above quote`,
        };

      case 'cost_var':
        return {
          name,
          title: 'Material cost variances',
          value:
            typeof originValue['kpi_val'] == 'number'
              ? ((originValue['kpi_val'] * 10000) / 100).toFixed(1)
              : '-',
          value_prev:
            typeof originValue['kpi_val_prev'] == 'number'
              ? ((originValue['kpi_val_prev'] * 10000) / 100).toFixed(1)
              : '-',
          suffix: '%',
          vs_prev:
            originValue['kpi_val'] > originValue['kpi_val_prev']
              ? 'up'
              : originValue['kpi_val'] < originValue['kpi_val_prev']
              ? 'down'
              : '',
          vs_target:
            originValue['kpi_val'] === originValue['ref_val']
              ? ''
              : originValue['kpi_val'] > originValue['ref_val']
              ? 'down'
              : 'up',
          secondLine: 'of sales, vs. 0% standard',
          summary: `${originValue['target_proj_num']}/${
            originValue['all_proj_num']
          } MP projects below 0% variance`,
        };

      case 'yield':
        return {
          name,
          title: 'Yield Rate',
          value:
            typeof originValue['kpi_val'] == 'number'
              ? ((originValue['kpi_val'] * 10000) / 100).toFixed(1)
              : '-',
          precision: 1,
          value_prev:
            typeof originValue['kpi_val_prev'] == 'number'
              ? ((originValue['kpi_val_prev'] * 10000) / 100).toFixed(1)
              : '-',
          suffix: '%',
          vs_prev:
            originValue['kpi_val'] > originValue['kpi_val_prev']
              ? 'up'
              : originValue['kpi_val'] < originValue['kpi_val_prev']
              ? 'down'
              : '',
          vs_target:
            originValue['kpi_val'] === originValue['ref_val']
              ? ''
              : originValue['kpi_val'] > originValue['ref_val']
              ? 'up'
              : 'down',
          secondLine:
            typeof originValue['ref_val'] == 'number'
              ? `vs. ${((originValue['ref_val'] * 10000) / 100).toFixed(
                  1,
                )}% target`
              : `vs. - target`,
          summary: `${originValue['target_proj_num']}/${
            originValue['all_proj_num']
          } MP projects above target`,
        };

      case 'ads':
        return {
          name,
          title: 'ADS (Finished Goods)',
          value:
            typeof originValue['kpi_val'] == 'number'
              ? Math.round(originValue['kpi_val'])
              : '-',
          precision: 0,
          value_prev:
            typeof originValue['kpi_val_prev'] == 'number'
              ? Math.round(originValue['kpi_val_prev'])
              : '-',
          suffix: ' days',
          vs_prev:
            originValue['kpi_val'] > originValue['kpi_val_prev']
              ? 'up'
              : originValue['kpi_val'] < originValue['kpi_val_prev']
              ? 'down'
              : '',
          vs_target:
            originValue['kpi_val'] === originValue['ref_val']
              ? ''
              : originValue['kpi_val'] > originValue['ref_val']
              ? 'down'
              : 'up',
          secondLine:
            typeof originValue['ref_val'] == 'number'
              ? `vs. ${Math.round(originValue['ref_val'])} days standard`
              : `vs. - days standard`,
          summary: `${originValue['target_proj_num']}/${
            originValue['all_proj_num']
          } MP projects below ${originValue['ref_val']} days`,
        };

      default:
        return {};
    }
  });
};

export const mapSingleProjectToTiles = data => {
  return Object.keys(data).map(name => {
    const originValue = data[name];

    // const { unit, value } = unitFormat(originValue);
    // const suffix = unit;

    switch (name) {
      // health
      case 'ship':
        return {
          name,
          title: 'Invoice Qty',
          value:
            typeof originValue['kpi_val'] == 'number'
              ? (originValue['kpi_val'] * 100).toFixed(1)
              : '-',
          value_prev:
            typeof originValue['kpi_val_prev'] == 'number'
              ? (originValue['kpi_val_prev'] * 100).toFixed(1)
              : '-',
          suffix: '%',
          vs_prev:
            originValue['kpi_val'] > originValue['kpi_val_prev']
              ? 'up'
              : originValue['kpi_val'] < originValue['kpi_val_prev']
              ? 'down'
              : '',
          vs_target:
            originValue['kpi_val'] === 1
              ? ''
              : originValue['kpi_val'] > 1
              ? 'up'
              : 'down',
          secondLine: 'vs. APR',
          summary: '',
        };

      case 'prod':
        return {
          name,
          title: 'Production Qty',
          value:
            typeof originValue['kpi_val'] == 'number'
              ? (originValue['kpi_val'] * 100).toFixed(1)
              : '-',
          value_prev:
            typeof originValue['kpi_val_prev'] == 'number'
              ? (originValue['kpi_val_prev'] * 100).toFixed(1)
              : '-',
          suffix: '%',
          vs_prev:
            originValue['kpi_val'] > originValue['kpi_val_prev']
              ? 'up'
              : originValue['kpi_val'] < originValue['kpi_val_prev']
              ? 'down'
              : '',
          vs_target:
            originValue['kpi_val'] === 1
              ? ''
              : originValue['kpi_val'] > 1
              ? 'up'
              : 'down',
          secondLine: 'vs. APR',
          summary: '',
        };

      case 'moh':
        return {
          name,
          title: 'Unit MOH',
          value:
            typeof originValue['kpi_val'] == 'number'
              ? (originValue['kpi_val'] * 100).toFixed(1)
              : '-',
          value_prev:
            typeof originValue['kpi_val_prev'] == 'number'
              ? (originValue['kpi_val_prev'] * 100).toFixed(1)
              : '-',
          suffix: '%',
          vs_prev:
            originValue['kpi_val'] > originValue['kpi_val_prev']
              ? 'up'
              : originValue['kpi_val'] < originValue['kpi_val_prev']
              ? 'down'
              : '',
          vs_target:
            originValue['kpi_val'] === 1
              ? ''
              : originValue['kpi_val'] > 1
              ? 'down'
              : 'up',
          secondLine: 'vs. quote1',
          summary: '',
        };

      case 'cost_var':
        return {
          name,
          title: 'Material cost variances',
          value:
            typeof originValue['kpi_val'] == 'number'
              ? ((originValue['kpi_val'] * 10000) / 100).toFixed(1)
              : '-',
          value_prev:
            typeof originValue['kpi_val_prev'] == 'number'
              ? ((originValue['kpi_val_prev'] * 10000) / 100).toFixed(1)
              : '-',
          suffix: '%',
          vs_prev:
            originValue['kpi_val'] > originValue['kpi_val_prev']
              ? 'up'
              : originValue['kpi_val'] < originValue['kpi_val_prev']
              ? 'down'
              : '',
          vs_target:
            originValue['kpi_val'] === originValue['ref_val']
              ? ''
              : originValue['kpi_val'] > originValue['ref_val']
              ? 'down'
              : 'up',
          secondLine: 'of sales, vs. 0% standard',
          summary: '',
        };

      case 'yield':
        return {
          name,
          title: 'Yield Rate',
          value:
            typeof originValue['kpi_val'] == 'number'
              ? ((originValue['kpi_val'] * 10000) / 100).toFixed(1)
              : '-',
          precision: 0,
          value_prev:
            typeof originValue['kpi_val_prev'] == 'number'
              ? ((originValue['kpi_val_prev'] * 10000) / 100).toFixed(1)
              : '-',
          suffix: '%',
          vs_prev:
            originValue['kpi_val'] > originValue['kpi_val_prev']
              ? 'up'
              : originValue['kpi_val'] < originValue['kpi_val_prev']
              ? 'down'
              : '',
          vs_target:
            originValue['kpi_val'] === originValue['ref_val']
              ? ''
              : originValue['kpi_val'] > originValue['ref_val']
              ? 'up'
              : 'down',
          secondLine:
            typeof originValue['ref_val'] == 'number'
              ? `vs. ${((originValue['ref_val'] * 10000) / 100).toFixed(
                  1,
                )}% target`
              : `vs. - target`,
          summary: '',
        };

      case 'ads':
        return {
          name,
          title: 'ADS (Finished Goods)',
          value:
            typeof originValue['kpi_val'] == 'number'
              ? Math.round(originValue['kpi_val'])
              : '-',
          precision: 0,
          value_prev:
            typeof originValue['kpi_val_prev'] == 'number'
              ? Math.round(originValue['kpi_val_prev'])
              : '-',
          suffix: ' days',
          vs_prev:
            originValue['kpi_val'] > originValue['kpi_val_prev']
              ? 'up'
              : originValue['kpi_val'] < originValue['kpi_val_prev']
              ? 'down'
              : '',
          vs_target:
            originValue['kpi_val'] === originValue['ref_val']
              ? ''
              : originValue['kpi_val'] > originValue['ref_val']
              ? 'down'
              : 'up',
          secondLine:
            typeof originValue['ref_val'] == 'number'
              ? `vs. ${Math.round(originValue['ref_val'])} days standard`
              : `vs. - days standard`,
          summary: '',
        };

      default:
        return {};
    }
  });
};
