import {
  ChangeEvent, FocusEvent, useCallback, useEffect, useState,
} from 'react';
import useSetCurrentView from '../common/app/useSetCurrentView';
import useSettingsModel from '../common/model/useSettingsModel';
import Header from '../components/Header';
import MainActionButton from '../components/MainActionButton';
import closeLogo from '../components/resources/close-circle.svg';
import SVGButton from '../components/SVGButton';
import { SettingsObject } from '../data/data.types';
import styles from './SettingsContainer.module.css';

export default function SettingsContainer() {
  const setCurrentView = useSetCurrentView();
  const settingsModel = useSettingsModel();

  const [settingsOnEdit, setSettingsOnEdit] = useState<SettingsObject>(
    { firstDayOfMonth: 1, numberOfHoursPerDay: 9, id: 'temp' },
  );

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await settingsModel.get();
      setSettingsOnEdit(settings);
    };

    loadSettings();
  }, [settingsModel]);

  const onDayOfMonthChanged = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = Number.parseInt(e.target.value, 10);
    setSettingsOnEdit({
      ...settingsOnEdit,
      firstDayOfMonth: Math.min(28, Math.max(1, numericValue)),
    });
  }, [settingsOnEdit]);

  const onDayOfMonthLostFocus = useCallback((e: FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.value === '') {
      setSettingsOnEdit({
        ...settingsOnEdit,
        firstDayOfMonth: 1,
      });
    }
  }, [settingsOnEdit]);

  const saveSettings = useCallback(() => {
    settingsModel.updateSettings(settingsOnEdit);
  }, [settingsModel, settingsOnEdit]);

  return (
    <div className={styles.container}>
      <div className={styles.formBody}>
        <Header content="Settings" rightIcon={<SVGButton svg={closeLogo} onClick={() => setCurrentView('main')} />} />
        First day of the month
        <input type="number" max={28} min={1} onChange={onDayOfMonthChanged} value={settingsOnEdit.firstDayOfMonth} onBlur={onDayOfMonthLostFocus} />
        <button type="button" onClick={() => setCurrentView('vacation-picker')}>Set vacation days</button>
      </div>
      <MainActionButton title="Save settings" onClick={saveSettings} />
    </div>
  );
}
