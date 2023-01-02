import styles from './Message.module.css'

type MessageProps = {
    message: string;
}

export default function Message(props: MessageProps) {
    return <div className={styles.message}>{props.message}</div>
}