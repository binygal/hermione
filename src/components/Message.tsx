import styles from './Message.module.css';

type MessageProps = {
  message: string;
};

export default function Message(props: MessageProps) {
  const { message } = props;
  return <div className={styles.message}>{message}</div>;
}
