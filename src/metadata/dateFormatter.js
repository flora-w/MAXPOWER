import format from 'date-fns/format';
import isValid from 'date-fns/isValid';

function formatDate(date) {
  return format(date, 'MMM yy')
    .split(' ')
    .join(`'`);
}

export function addDashIntoYearMonth(date) {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  return `${year}-${month}`;
}

export default value => {
  const partition = value.split('/').length;
  if (partition === 2) {
    const date = new Date(`${value}/01`);
    if (isValid(date)) {
      return formatDate(date);
    }
  }

  if (partition === 3) {
    const date = new Date(value);
    if (isValid(date)) {
      return formatDate(date);
    }
  }

  return value;
};
