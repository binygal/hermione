import { useCallback, useEffect, useState } from 'react';
import CurrentStateDisplay from '../components/CurrentStateDisplay';
import Header from '../components/Header';
import MainActionButton from '../components/MainActionButton';
import styles from '../../styles/Home.module.css';
import ElapsingTime from '../components/ElapsingTime';
import Message from '../components/Message';
import useRecordsModel from '../common/useRecordsModel';
import { getTimeDiff, TimeDiff } from '../common/extensions/date';
import useSetCurrentView from '../common/app/useSetCurrentView';
import SVGButton from '../components/SVGButton';
import listLogo from '../components/resources/list.svg';
import MonthlySummary from './MonthlySummary';

export default function TimeTrackerContainer() {
  const recordsModel = useRecordsModel();
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState<TimeDiff>({ hours: 0, minutes: 0 });
  const [monthlySummary, setMonthlySummary] = useState({ hours: 0, minutes: 0 });
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
      const today = new Date();
      const monthlyData = await recordsModel.getTotalTimeBetweenDates(
        (new Date(today.getFullYear(), today.getMonth())).getTime(),
        (new Date(today.getFullYear(), today.getMonth() + 1)).getTime(),
      );
      setMonthlySummary(monthlyData);
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
        leftIcon={<SVGButton onClick={() => setCurrentView('logs-container')} svg={listLogo} />}
      />
      <div className={styles.containerItem}>
        <CurrentStateDisplay logo={renderData.logo} />
      </div>
      <MonthlySummary monthlyRecord={monthlySummary} />
      {isWorking ? <ElapsingTime hours={time.hours} minutes={time.minutes} /> : <Message message="Start to see elapsing time" />}
      <MainActionButton onClick={startNowCallback} title={renderData.title} />
    </div>
  );
}
