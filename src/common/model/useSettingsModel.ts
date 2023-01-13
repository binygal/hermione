import { useContext } from 'react';
import MainModelContext from './MainModelContext';

export default function useSettingsModel() {
  const context = useContext(MainModelContext);
  return context.model.settingsModel;
}
