import Head from 'next/head';
import { useMemo } from 'react';
import MainModelContext, { MainModel } from '../src/common/MainModelContext';
import OpenRecordsListButton from '../src/records-list/OpenRecordsListButton';
import TimeTrackerContainer from '../src/time-tracker/TimeTrackerContainer';
import styles from '../styles/Home.module.css';

export default function Home() {
  const mainModel = useMemo(() => new MainModel(), []);
  const mainModelContextValue = useMemo(() => ({ model: mainModel }), [mainModel]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainModelContext.Provider value={mainModelContextValue}>
        <OpenRecordsListButton />
        <TimeTrackerContainer />
      </MainModelContext.Provider>
    </div>
  );
}
