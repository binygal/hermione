import styles from './MainActionButton.module.css';

type StartNowButtonProps = {
  onClick: () => void;
  title: string
};

export default function MainActionButton(props: StartNowButtonProps) {
  const { onClick, title } = props;
  return <button type="button" className={styles.button} onClick={onClick}>{title}</button>;
}
