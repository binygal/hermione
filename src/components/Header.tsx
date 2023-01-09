import styles from './Header.module.css';

type HeaderProps = {
  content: string,
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
};

export default function Header(props: HeaderProps) {
  const { content, leftIcon, rightIcon } = props;
  const leftButtonElement = <div className={styles.leftIcon}>{leftIcon}</div>;
  const rightButtonElement = <div className={styles.rightIcon}>{rightIcon}</div>;
  return (
    <div className={styles.header}>
      {rightButtonElement}
      <div className={styles.content}>{content}</div>
      {leftButtonElement}
    </div>
  );
}

Header.defaultProps = {
  leftIcon: null,
  rightIcon: null,
};
