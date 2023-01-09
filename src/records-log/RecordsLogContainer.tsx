import useSetCurrentView from '../common/app/useSetCurrentView';
import Header from '../components/Header';
import BackArrowButton from '../components/BackArrowButton';

export default function RecordsLogContainer() {
  const setCurrentView = useSetCurrentView();
  return (
    <div>
      <Header
        content="Records log"
        rightIcon={<BackArrowButton onClick={() => setCurrentView('main')} />}
      />
    </div>
  );
}
