import { useCallback, useState, ChangeEvent } from 'react';
import { v4 } from 'uuid';
import useSetCurrentView from '../common/app/useSetCurrentView';
import { convertDateToInputString, convertInputStringToTimestamp } from '../common/extensions/date';
import useRecordsModel from '../common/useRecordsModel';
import Header from '../components/Header';
import MainActionButton from '../components/MainActionButton';
import closeLogo from '../components/resources/close-circle.svg';
import SVGButton from '../components/SVGButton';
import { Record } from '../data/data.types';
import styles from './RecordEditorContainer.module.css';

function createTemplateRecord(): Record {
  const currentDate = Date.now();
  const flooredToMinutesDate = currentDate - (currentDate % 60000);
  return { id: v4(), startTime: flooredToMinutesDate, endTime: flooredToMinutesDate };
}

export default function RecordEditorContainer() {
  const setCurrentView = useSetCurrentView();
  const [recordOnEdit, setRecordOnEdit] = useState(createTemplateRecord());
  const recordsModel = useRecordsModel();

  const startDate = new Date(recordOnEdit.startTime);
  const endDate = recordOnEdit.endTime ? new Date(recordOnEdit.endTime) : '';
  const updateStartTimeOnRecord = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value) {
        return;
      }
      const updatedTime = convertInputStringToTimestamp(e.target.value);
      setRecordOnEdit({ ...recordOnEdit, startTime: updatedTime });
    },
    [recordOnEdit],
  );

  const updateEndTimeOnRecord = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const updatedTime = convertInputStringToTimestamp(e.target.value);
      setRecordOnEdit({ ...recordOnEdit, endTime: updatedTime });
    },
    [recordOnEdit],
  );

  const saveRecord = useCallback(() => {
    recordsModel.createRecord(recordOnEdit);
    setCurrentView('logs-container');
  }, [recordOnEdit, recordsModel, setCurrentView]);

  return (
    <div className={styles.container}>
      <Header
        content="Add record"
        rightIcon={(
          <SVGButton
            onClick={() => setCurrentView('logs-container')}
            svg={closeLogo}
          />
)}
      />
      <div className={styles.inputContainer}>
        <span>Start time</span>
        <input type="datetime-local" required value={convertDateToInputString(startDate)} onChange={updateStartTimeOnRecord} />
        <span>End time</span>
        <input type="datetime-local" value={endDate && convertDateToInputString(endDate)} onChange={updateEndTimeOnRecord} />
      </div>
      <MainActionButton title="Save" onClick={saveRecord} />
    </div>
  );
}