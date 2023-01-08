import styles from './StartNowButton.module.css';

type StartNowButtonProps = {
  onClick: () => void;
  title: string
};

export default function StartNowButton(props: StartNowButtonProps) {
  const { onClick, title } = props;
  return <button type="button" className={styles.button} onClick={onClick}>{title}</button>;
}
