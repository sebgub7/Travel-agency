import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderoptionIcons from './OrderOptionIcons';
import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionDate from './OrderOptionDate';
import OrderOptionText from './OrderOptionText';

const optionTypes = {
  text: OrderOptionText,
  date: OrderOptionDate,
  dropdown: OrderOptionDropdown,
  icons: OrderoptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
};

const OrderOption = ({name, type, id, setOrderOption, ...otherProps}) => {
  const OptionComponent = optionTypes[type];
  if(!OptionComponent){
    return null;
  } else {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent
          {...otherProps} setOptionValue={value => setOrderOption({[id]: value})}
        />
      </div>
    );
  }
};

OrderOption.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  setOrderOption: PropTypes.func,
};

export default OrderOption;