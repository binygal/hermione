import styles from './ElapsingTime.module.css'

type ElapsingTimeProps = {
    hours: number;
    minutes: number;
}

export default function ElapsingTime(props: ElapsingTimeProps): JSX.Element {
    const hoursToRender = props.hours.toString().padStart(2, '0');
    const minutesToRender = props.minutes.toString().padStart(2, '0');
    return <div className={styles.elapsingTimeContainer}>{hoursToRender} : {minutesToRender}</div>
}