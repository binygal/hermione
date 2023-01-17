import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useCallback, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import styles from './VacationPickerEditor.module.css';
import useSetCurrentView from '../common/app/useSetCurrentView';
import Header from '../components/Header';
import SVGButton from '../components/SVGButton';
import closeLogo from '../components/resources/close-circle.svg';
import useVacationsModel from '../common/model/useVacationsModel';
import { StringifiedVacation } from './VacationsModel';
import { convertDateToDateString } from '../common/extensions/date';

export default function VacationPickerEditor() {
  const vacationsModel = useVacationsModel();
  const setCurrentView = useSetCurrentView();
  const [vacationDates, setVacationDates] = useState<StringifiedVacation[]>([]);

  const loadAll = useCallback(async () => {
    const vacations = await vacationsModel.getAll();
    setVacationDates(vacations);
  }, [vacationsModel]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const saveVacation = useCallback(
    async (date: Date) => {
      const vacationDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
      const currentVacation = vacationDates
        .find((v) => v.vacation === convertDateToDateString(date));
      if (currentVacation) {
        await vacationsModel.remove(currentVacation.id);
      } else {
        await vacationsModel.add({
          id: v4(),
          vacationDate,
        });
      }
      loadAll();
    },
    [loadAll, vacationDates, vacationsModel],
  );

  return (
    <div>
      <Header
        content="Vacation picker"
        rightIcon={<SVGButton onClick={() => setCurrentView('settings')} svg={closeLogo} />}
      />
      <Calendar
        value={undefined}
        onClickDay={saveVacation}
        tileClassName={
           (d) => (vacationDates.some((vacation) => vacation.vacation === convertDateToDateString(d.date)) ? styles.vacation : '')
}
      />
    </div>
  );
}
