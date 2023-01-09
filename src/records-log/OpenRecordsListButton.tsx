import Image from 'next/image';
import listLogo from '../components/resources/list.svg';
import styles from './OpenRecordsListButton.module.css';

type OpenRecordsListButtonProps = {
  onClick: () => void
};

export default function OpenRecordsListButton(props: OpenRecordsListButtonProps) {
  const { onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.button}
    >
      <Image src={listLogo.src} alt="open list" width={30} height={30} />
    </button>
  );
}
