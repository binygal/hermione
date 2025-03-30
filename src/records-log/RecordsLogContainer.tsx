import useSetCurrentView from "../common/app/useSetCurrentView";
import useRecordsModel from "../common/model/useRecordsModel";
import Header from "../components/Header";
import MainActionButton from "../components/MainActionButton";
import listLogo from "../components/resources/back-arrow.svg";
import SVGButton from "../components/SVGButton";
import { Record } from "../data/data.types";
import RecordEntry from "./RecordEntry";

type RecordsLogContainerProps = {
  records: Record[];
};

export default function RecordsLogContainer(props: RecordsLogContainerProps) {
  const { records } = props;
  const setCurrentView = useSetCurrentView();
  const recordsModel = useRecordsModel();
  const sortedRecords = records.sort((lh, rh) => rh.startTime - lh.startTime);
  const recordsToRender = sortedRecords.map((r) => (
    <RecordEntry
      record={r}
      key={r.id}
      onEditClicked={() => setCurrentView("record-editor", { id: r.id })}
      onDeleteClicked={() => {
        recordsModel.deleteRecord(r.id);
      }}
    />
  ));
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
