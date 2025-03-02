import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";
import useNotify from "../common/app/useNotify";
import useSetCurrentView from "../common/app/useSetCurrentView";
import DateTimePicker from "../common/components/DateTimePicker";
import { dateFormatter } from "../common/extensions/date";
import useRecordsModel from "../common/model/useRecordsModel";
import Header from "../components/Header";
import MainActionButton from "../components/MainActionButton";
import closeLogo from "../components/resources/close-circle.svg";
import SVGButton from "../components/SVGButton";
import { Record } from "../data/data.types";
import styles from "./RecordEditorContainer.module.css";

type RecordEditorContainerProps = {
  id?: string;
};

function createTemplateRecord(): Record {
  const currentDate = Date.now();
  const flooredToMinutesDate = currentDate - (currentDate % 60000);
  return { id: v4(), startTime: flooredToMinutesDate, endTime: flooredToMinutesDate };
}

export default function RecordEditorContainer(props: RecordEditorContainerProps) {
  const { id } = props;
  const setCurrentView = useSetCurrentView();
  const notify = useNotify();
  const [recordOnEdit, setRecordOnEdit] = useState(createTemplateRecord());
  const recordsModel = useRecordsModel();

  const startDate = new Date(recordOnEdit.startTime);
  const endDate = recordOnEdit.endTime ? new Date(recordOnEdit.endTime) : undefined;
  useEffect(() => {
    const loadRecord = async () => {
      if (id) {
        const record = await recordsModel.getRecord(id);
        setRecordOnEdit(record);
      }
    };
    loadRecord();
  }, [id, recordsModel]);

  const saveRecord = useCallback(async () => {
    try {
      if (id) {
        await recordsModel.updateRecord(recordOnEdit);
      } else {
        await recordsModel.createRecord(recordOnEdit);
      }
      setCurrentView("logs-container");
    } catch {
      notify.error("Error on storing record");
    }
  }, [id, notify, recordOnEdit, recordsModel, setCurrentView]);

  return (
    <div className={styles.container}>
      <Header
        content="Add record"
        rightIcon={<SVGButton onClick={() => setCurrentView("logs-container")} svg={closeLogo} />}
      />
      <div className={styles.inputContainer}>
        <span>Start time</span>
        <DateTimePicker
          value={startDate}
          onDateChange={(date) => setRecordOnEdit((record) => ({ ...record, startTime: date.getTime() }))}
          dateFormatter={dateFormatter}
        />
        <span>End time</span>
        <DateTimePicker
          value={endDate}
          onDateChange={(date) => setRecordOnEdit((record) => ({ ...record, endTime: date.getTime() }))}
          dateFormatter={dateFormatter}
        />
      </div>
      <MainActionButton title="Save" onClick={saveRecord} />
    </div>
  );
}

RecordEditorContainer.defaultProps = {
  id: null,
};
