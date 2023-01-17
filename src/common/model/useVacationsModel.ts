import { useContext } from 'react';
import MainModelContext from './MainModelContext';

export default function useVacationsModel() {
  const context = useContext(MainModelContext);
  return context.model.vacationsModel;
}
