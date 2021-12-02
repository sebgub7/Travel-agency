import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';

const OrderOptionText = ({ setOptionValue, currentValue }) => (
  <div>
    <input
      value={currentValue} 
      className={styles.input}
      onChange={(event) => setOptionValue(event.currentTarget.value)}
      type="text"
    />
  </div>
);

OrderOptionText.propTypes ={
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.string,
};

export default OrderOptionText;