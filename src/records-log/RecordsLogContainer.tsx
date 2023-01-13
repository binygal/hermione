import { useCallback, useEffect, useState } from 'react';
import useSetCurrentView from '../common/app/useSetCurrentView';
import Header from '../components/Header';
import SVGButton from '../components/SVGButton';
import useRecordsModel from '../common/model/useRecordsModel';
import RecordEntry from './RecordEntry';
import { Record } from '../data/data.types';
import MainActionButton from '../components/MainActionButton';
import styles from './RecordsLogContainer.module.css';
import listLogo from '../components/resources/back-arrow.svg';

export default function RecordsLogContainer() {
  const setCurrentView = useSetCurrentView();
  const recordsModel = useRecordsModel();
  const [records, setRecords] = useState<Record[]>([]);
  const loadRecords = useCallback(async () => {
    const allRecords = await recordsModel.getAllRecords();
    setRecords(allRecords.sort((lh, rh) => lh.startTime - rh.startTime));
  }, [recordsModel]);
  useEffect(() => {
    loadRecords();
  }, [loadRecords]);
  const recordsToRender = records.map((r) => (
    <RecordEntry
      record={r}
      key={r.id}
      onEditClicked={() => setCurrentView('record-editor', { id: r.id })}
      onDeleteClicked={() => {
        recordsModel.deleteRecord(r.id);
        loadRecords();
      }}
    />
  ));
  return (
    <div className={styles.container}>
      <Header
        content="Records log"
        rightIcon={<SVGButton onClick={() => setCurrentView('main')} svg={listLogo} />}
      />
      <div className={styles.entriesContainer}>
        {recordsToRender}
      </div>
      <MainActionButton title="Add new" onClick={() => { setCurrentView('record-editor'); }} />
    </div>
  );
}
