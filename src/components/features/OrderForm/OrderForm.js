import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
//import styles from './OrderForm.scss';
import OrderSummary from '../OrderSummary/OrderSummary';
import Section from '../../layout/Section/Section';

const OrderForm = ({options, tripCost}) => {
  console.log('tripCost',tripCost);
  return(
    <Section>
      <Grid>
        <Row>
          <Col xs={12}>
            <OrderSummary options={options} tripCost={tripCost} />
          </Col>
        </Row>
      </Grid>
    </Section>
  )
}
export default OrderForm;