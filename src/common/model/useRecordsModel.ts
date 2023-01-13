import { useContext } from 'react';
import MainModelContext from './MainModelContext';

export default function useRecordsModel() {
  const context = useContext(MainModelContext);
  return context.model.recordsModel;
}
