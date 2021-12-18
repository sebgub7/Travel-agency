import React from 'react';
import styles from './HappyHourAd.module.scss';
import PropTypes from 'prop-types';
import { formatTime } from '../../../utils/formatTime';

class HappyHourAd extends React.Component {
  getCountdownTime() {
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));

    if (currentTime.getUTCHours() >= 12) {
      nextNoon.setUTCDate(currentTime.getUTCDate() + 1);
    }

    return Math.round((nextNoon.getTime() - currentTime.getTime()) / 1000);
  }

  constructor() {
    super();
    setInterval(() => this.forceUpdate(), 1000);
  }

  render() {
    let { promoDescription, title } = this.props;
    const time = this.getCountdownTime();

    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.promoDescription}>{time > 23 * 60 * 60 ? promoDescription : formatTime(time)}</div>
      </div>
    );
  }
}

HappyHourAd.propTypes = {
  promoDescription: PropTypes.string,
  title: PropTypes.string,
};

export default HappyHourAd;