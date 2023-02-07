import { useContext } from 'react';
import PresentorContext from './PresentorContext';

export default function useNotify() {
  const presentorContext = useContext(PresentorContext);
  return presentorContext.notify;
}
