import { useContext } from 'react';
import PresentorContext from './PresentorContext';

export default function useSetCurrentView() {
  const presentorContext = useContext(PresentorContext);
  return presentorContext.setCurrentView;
}
