import React from 'react';
import { DatePicker as MaterialDatePicker } from '@material-ui/pickers';
import CalendarToday from '@material-ui/icons/CalendarToday';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/styles';

import { GREEN } from 'constants/colors';

const useStyles = makeStyles({
  root: {
    fontSize: 12,
    width: 144,
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: GREEN,
      },
    },
  },
});

export default function MonthPicker({
  onChange,
  periodStart = new Date(),
  maxDate = new Date(),
}) {
  const classes = useStyles();
  const nextMaxDate =
    new Date(periodStart) > new Date(maxDate) ? periodStart : maxDate;
  return (
    <MaterialDatePicker
      autoOk
      className={classes.root}
      views={['year', 'month']}
      openTo="month"
      variant="inline"
      inputVariant="outlined"
      format="yyyy-MM"
      value={periodStart}
      minDate={new Date('2018')}
      maxDate={nextMaxDate}
      onChange={() => {}}
      onYearChange={() => {}}
      onMonthChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position={'end'}>
            <CalendarToday fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  );
}
