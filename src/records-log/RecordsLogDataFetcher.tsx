import { useQuery } from "@tanstack/react-query";
import Loader from "../common/components/Loader";
import useRecordsModel from "../common/model/useRecordsModel";
import RecordsLogContainer from "./RecordsLogContainer";

export default function RecordsLogDataFetcher() {
  const recordsModel = useRecordsModel();
  const { data, isLoading } = useQuery({
    queryKey: ["recordsLog"],
    queryFn: async () => {
      const records = await recordsModel.getAllRecords();
      return records;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return <RecordsLogContainer records={data ?? []} />;
}
