'use client';

import Presentor from '../src/common/app/Presentor';
import styles from '../styles/Home.module.css';

import '../src/vacation-picker/VacationPickerEditor.css';
import '../styles/globals.css';

export default function Home() {

  return (
    <div className={styles.container}>
      <Presentor />
    </div>
  );
}
