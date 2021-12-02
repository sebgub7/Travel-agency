import React from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const OrderOptionDate = ({currentValue, setOptionValue}) => {
  return (
    <DatePicker selected={currentValue}
    onChange={(date) => setOptionValue(date)}
    dateFormat = 'dd/MM/yyyy'
    />
  );
};

export default OrderOptionDate;