import styles from './ElapsingTime.module.css';

import type { JSX } from "react";

type ElapsingTimeProps = {
  hours: number;
  minutes: number;
  size?: 'big' | 'small'
};

export default function ElapsingTime(props: ElapsingTimeProps): JSX.Element {
  const { hours, minutes, size = 'big' } = props;
  const hoursToRender = hours.toString().padStart(2, '0');
  const minutesToRender = minutes.toString().padStart(2, '0');
  return (
    <div className={`${styles.elapsingTimeContainer} ${size === 'small' ? styles.small : ''}`}>
      {hoursToRender}
      {' '}
      :
      {' '}
      {minutesToRender}
    </div>
  );
}

ElapsingTime.defaultProps = {
  size: 'big',
};
