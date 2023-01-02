import styles from './Header.module.css';

type HeaderProps = {
    content: string
}

export default function Header(props: HeaderProps) {
    return <div className={styles.header}>
        {props.content}
    </div>
}