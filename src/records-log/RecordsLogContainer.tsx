import { useCallback, useEffect, useState } from "react";
import useSetCurrentView from "../common/app/useSetCurrentView";
import useRecordsModel from "../common/model/useRecordsModel";
import Header from "../components/Header";
import MainActionButton from "../components/MainActionButton";
import listLogo from "../components/resources/back-arrow.svg";
import SVGButton from "../components/SVGButton";
import { Record } from "../data/data.types";
import RecordEntry from "./RecordEntry";

export default function RecordsLogContainer() {
  const setCurrentView = useSetCurrentView();
  const recordsModel = useRecordsModel();
  const [records, setRecords] = useState<Record[]>([]);
  const loadRecords = useCallback(async () => {
    const allRecords = await recordsModel.getAllRecords();
    setRecords(allRecords.sort((lh, rh) => rh.startTime - lh.startTime));
  }, [recordsModel]);
  useEffect(() => {
    loadRecords();
  }, [loadRecords]);
  const recordsToRender = records.map((r) => (
    <RecordEntry
      record={r}
      key={r.id}
      onEditClicked={() => setCurrentView("record-editor", { id: r.id })}
      onDeleteClicked={() => {
        recordsModel.deleteRecord(r.id);
        loadRecords();
      }}
    />
  ));
  if (records.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="loading loading-dots loading-xl" />
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header content="Records log" rightIcon={<SVGButton onClick={() => setCurrentView("main")} svg={listLogo} />} />
      <div className="flex-1 overflow-auto mt-2">{recordsToRender}</div>
      <MainActionButton
        title="Add new"
        onClick={() => {
          setCurrentView("record-editor");
        }}
      />
    </div>
  );
}
