import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const OrderOptionDate = ({ currentValue, setOptionValue }) => {
  return (
    <DatePicker selected={currentValue}
      onChange={(date) => setOptionValue(date)}
      dateFormat='dd/MM/yyyy'
    />
  );
};

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.string,
};

export default OrderOptionDate;