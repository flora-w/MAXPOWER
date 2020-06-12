import React from 'react';
import isNumber from 'lodash/isNumber';
import { FormattedNumber } from 'react-intl';
import { toPrecision } from 'utils/numbersHelpers';

export default function NumberComp({
  suffix,
  prefix,
  valueStyle,
  value,
  precision,
}) {
  function getValue() {
    if (!isNumber(value) || isNaN(value) || !isFinite(value)) return '-';
    return (
      <FormattedNumber
        value={toPrecision(precision)(value)}
        minimumFractionDigits={isNumber(precision) ? precision : 0}
      />
    );
  }
  return (
    <span style={{ fontSize: 24, ...valueStyle }}>
      {prefix}
      {getValue()}
      {suffix}
    </span>
  );
}

NumberComp.defaultProps = {
  value: 0,
  precision: 0,
  suffix: '',
  prefix: '',
  valueStyle: { fontSize: 24 },
};
