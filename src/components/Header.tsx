import styles from "./Header.module.css";

type HeaderProps = {
  content: string;
  leftIcon?: React.ReactElement<any>;
  rightIcon?: React.ReactElement<any>;
};

export default function Header(props: HeaderProps) {
  const { content, leftIcon, rightIcon } = props;
  const leftButtonElement = <div className={styles.leftIcon}>{leftIcon}</div>;
  const rightButtonElement = <div className={styles.rightIcon}>{rightIcon}</div>;
  return (
    <div className={styles.header}>
      {rightButtonElement}
      <div className="text-3xl justify-self-center text-center flex-1 m-2">{content}</div>
      {leftButtonElement}
    </div>
  );
}

Header.defaultProps = {
  leftIcon: null,
  rightIcon: null,
};
