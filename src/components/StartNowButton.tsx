import styles from './StartNowButton.module.css';

type StartNowButtonProps = {
    onClick: () => void;
    title: string
}

export default function StartNowButton(props: StartNowButtonProps) {
    return <button className={styles.button} onClick={props.onClick}>{props.title}</button>
}