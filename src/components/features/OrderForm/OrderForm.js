import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
//import styles from './OrderForm.scss';
import OrderSummary from '../OrderSummary/OrderSummary';
import Section from '../../layout/Section/Section';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';

const OrderForm = ({ options, tripCost, setOrderOption }) => {
  console.log('tripCost', tripCost);
  return (
    <Section>
      <Grid>
        <Row>
          {pricing.map(option => (
            <Col md={4} key={option.id}>
              <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption} />
            </Col>
          ))}
          <Col xs={12}>
            <OrderSummary options={options} tripCost={tripCost} />
          </Col>
        </Row>
      </Grid>
    </Section>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.node,
  setOrderOption: PropTypes.node,
  tripName: PropTypes.string,
  countryCode: PropTypes.string,
  tripId: PropTypes.string,
};
export default OrderForm;