import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';
import { formatPrice } from '../../../utils/formatPrice';

const newValueSet = (currentValue, id, checked) => {
  if(checked){
    return [
      ...currentValue,
      id,
    ];
  } else {
    return currentValue.filter(value => value !== id);
  }
};

const OrderOptionCheckboxes = ({values, currentValue, setOptionValue}) => (
  <div className={styles.checkboxes}>
    {values.map((value) => (
      <label className={styles.icon} key={value.id}>
        {value.name}{(formatPrice(value.price))}
        <input 
          type="checkbox"
          value={value.id}
          checked={currentValue.includes(value.id) ? true : false}
          onChange={(event) => setOptionValue(newValueSet(currentValue, value.id, event.currentTarget.checked))}
        />
      </label>
    ))}

  </div>
);

OrderOptionCheckboxes.propTypes = {
  values: PropTypes.array,
  currentValue: PropTypes.array,
  setOptionValue: PropTypes.func,
};
export default OrderOptionCheckboxes;