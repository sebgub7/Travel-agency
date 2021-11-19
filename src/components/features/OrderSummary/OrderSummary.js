import React from 'react';
import styles from './OrderSummary.module.scss';
import { calculateTotal } from '../../../utils/calculateTotal';
import { formatPrice } from '../../../utils/formatPrice';

const OrderSummary = ({tripCost, options}) => {
  console.log('tripCost',tripCost);
  return (
    <h2 className={styles.component}>Total: <strong>{formatPrice(calculateTotal(tripCost, options))}</strong></h2>
  )
}

export default OrderSummary;