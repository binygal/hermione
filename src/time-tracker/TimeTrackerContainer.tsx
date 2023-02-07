import { useCallback, useEffect, useState } from 'react';
import CurrentStateDisplay from '../components/CurrentStateDisplay';
import Header from '../components/Header';
import MainActionButton from '../components/MainActionButton';
import styles from '../../styles/Home.module.css';
import ElapsingTime from '../components/ElapsingTime';
import Message from '../components/Message';
import useRecordsModel from '../common/model/useRecordsModel';
import {
  getTimeDiff, monthEncapsulingDates, TimeDiff, today as getToday,
} from '../common/extensions/date';
import useSetCurrentView from '../common/app/useSetCurrentView';
import SVGButton from '../components/SVGButton';
import listLogo from '../components/resources/list.svg';
import settingsLogo from '../components/resources/settings.svg';
import MonthlySummary from './MonthlySummary';
import useSettingsModel from '../common/model/useSettingsModel';
import DailySummary from './DailySummary';

export default function TimeTrackerContainer() {
  const recordsModel = useRecordsModel();
  const settingsModel = useSettingsModel();
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState<TimeDiff>({ hours: 0, minutes: 0 });
  const [monthlySummary, setMonthlySummary] = useState({ hours: 0, minutes: 0 });
  const [dailySummary, setDailySummary] = useState({ hours: 0, minutes: 0 });
  const [missingMonthlyTime, setMissingMonthlyTime] = useState({ hours: 0, minutes: 0 });
  const renderData = {
    logo: isWorking ? 'working' : 'coffee' as 'working' | 'coffee',
    title: isWorking ? 'stop' : 'start',
  };

  useEffect(() => {
    const checkWorkingState = async () => {
      const settings = await settingsModel.get();
      const currentRecord = await recordsModel.currentOnGoingRecord;
      setIsWorking(currentRecord != null);
      if (currentRecord) {
        setTime(getTimeDiff(currentRecord?.startTime, Date.now()));
      }

      const today = new Date();
      const [firstMonthDay, lastMonthDay] = monthEncapsulingDates(
        settings.firstDayOfMonth,
        today.getTime(),
      );
      const monthlyData = await recordsModel
        .getTotalRecordsTimeBetweenDates(firstMonthDay, lastMonthDay);
      setMonthlySummary(monthlyData);
      const expectedHours = await recordsModel.expectedHoursPerMonth();

      const missingMinutes = monthlyData.minutes === 0 ? 0 : 60 - monthlyData.minutes;
      const missingHours = Math.max(
        0,
        expectedHours - monthlyData.hours - (missingMinutes === 0 ? 0 : 1),
      );
      setMissingMonthlyTime({ hours: missingHours, minutes: missingMinutes });

      const dailyData = await recordsModel.getTotalRecordsTimeBetweenDates(
        getToday(),
        getToday(1),
      );
      setDailySummary(dailyData);
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
  }, [recordsModel, settingsModel]);

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
        rightIcon={<SVGButton onClick={() => setCurrentView('settings')} svg={settingsLogo} />}
      />
      <div className={styles.containerItem}>
        <CurrentStateDisplay logo={renderData.logo} />
      </div>
      <DailySummary time={dailySummary} />
      <MonthlySummary monthlyRecord={monthlySummary} timeToCompletion={missingMonthlyTime} />
      {isWorking ? <ElapsingTime hours={time.hours} minutes={time.minutes} /> : <Message message="Start to see elapsing time" />}
      <MainActionButton onClick={startNowCallback} title={renderData.title} />
    </div>
  );
}
