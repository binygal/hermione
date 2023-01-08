import Image from 'next/image';
import listLogo from '../components/resources/list.svg';
import styles from './OpenRecordsListButton.module.css';

export default function OpenRecordsListButton() {
  return <button type="button" className={styles.button}><Image src={listLogo.src} alt="open list" width={30} height={30} /></button>;
}
