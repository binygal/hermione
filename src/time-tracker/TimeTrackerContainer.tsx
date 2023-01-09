import { useCallback, useEffect, useState } from 'react';
import CurrentStateDisplay from '../components/CurrentStateDisplay';
import Header from '../components/Header';
import StartNowButton from '../components/StartNowButton';
import styles from '../../styles/Home.module.css';
import ElapsingTime from '../components/ElapsingTime';
import Message from '../components/Message';
import useRecordsModel from '../common/useRecordsModel';
import { getTimeDiff, TimeDiff } from '../common/extensions/date';
import OpenRecordsListButton from '../records-log/OpenRecordsListButton';
import useSetCurrentView from '../common/app/useSetCurrentView';

export default function TimeTrackerContainer() {
  const recordsModel = useRecordsModel();
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState<TimeDiff>({ hours: 0, minutes: 0 });
  const renderData = {
    logo: isWorking ? 'working' : 'coffee' as 'working' | 'coffee',
    title: isWorking ? 'stop' : 'start',
  };

  useEffect(() => {
    const checkWorkingState = async () => {
      const currentRecord = await recordsModel.currentOnGoingRecord;
      setIsWorking(currentRecord != null);
      if (currentRecord) {
        setTime(getTimeDiff(currentRecord?.startTime, Date.now()));
      }
    };

    const intervalID = setInterval(async () => {
      const currentRecord = await recordsModel.currentOnGoingRecord;
      if (currentRecord) {
        setTime(getTimeDiff(currentRecord?.startTime, Date.now()));
      }
    }, 60000);
    checkWorkingState();
    return () => {
      clearInterval(intervalID);
    };
  }, [recordsModel]);

  const startNowCallback = useCallback(
    async () => {
      await recordsModel.createOrSealRecord();
      const currentRecord = await recordsModel.currentOnGoingRecord;
      setIsWorking(currentRecord != null);
    },
    [recordsModel, setIsWorking],
  );

  const setCurrentView = useSetCurrentView();

  return (
    <div className={styles.content}>
      <Header
        content="Time tracking"
        leftIcon={<OpenRecordsListButton onClick={() => setCurrentView('logs-container')} />}
      />
      <div className={styles.containerItem}>
        <CurrentStateDisplay logo={renderData.logo} />
      </div>
      {isWorking ? <ElapsingTime hours={time.hours} minutes={time.minutes} /> : <Message message="Start to see elapsing time" />}
      <StartNowButton onClick={startNowCallback} title={renderData.title} />
    </div>
  );
}
