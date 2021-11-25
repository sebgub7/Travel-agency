import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';
import { formatPrice } from '../../../utils/formatPrice';

const OrderOptionNumber = ({ price, currentValue, limits, setOptionValue }) => (
  <div className={styles.inputSmall}>
    <input
      type='number'
      value={currentValue}
      min={limits.min}
      max={limits.max}
      onChange={event => setOptionValue(Number(event.currentTarget.value))}
    />
    {formatPrice(price)}
  </div>
);

OrderOptionNumber.propTypes = {
  price: PropTypes.string,
  currentValue: PropTypes.number,
  limits: PropTypes.object,
  setOptionValue: PropTypes.func,
};

export default OrderOptionNumber;
