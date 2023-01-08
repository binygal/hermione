import styles from './Header.module.css';

type HeaderProps = {
  content: string
};

export default function Header(props: HeaderProps) {
  const { content } = props;
  return (
    <div className={styles.header}>
      {content}
    </div>
  );
}
