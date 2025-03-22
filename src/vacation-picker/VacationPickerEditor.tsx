"use client";

import "cally";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { v4 } from "uuid";
import useVacationsModel from "../common/model/useVacationsModel";
import Header from "../components/Header";
import closeLogo from "../components/resources/close-circle.svg";
import { Vacation } from "../data/data.types";
import MultiDatesPicker from "./MultiDatesPicker";

export default function VacationPickerEditor() {
  const vacationsModel = useVacationsModel();
  const [vacations, setVacations] = useState<Vacation[]>([]);

  const loadAll = useCallback(async () => {
    const vacations = await vacationsModel.getVacationDates();
    setVacations(vacations);
  }, [vacationsModel]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const saveDates = useCallback(
    async (updatedDates: Date[]) => {
      const newDates = updatedDates.filter((date) => !vacations.some((v) => v.vacationDate === date.getTime()));
      const addDateTasks = newDates.map((date) =>
        vacationsModel.add({ id: v4(), vacationDate: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) })
      );
      const removedDates = vacations.filter((v) => !updatedDates.some((date) => v.vacationDate === date.getTime()));

      const removeDateTasks = removedDates.map((v) => vacationsModel.remove(v.id));
      await Promise.all([...addDateTasks, ...removeDateTasks]);
      loadAll();
    },
    [vacations, loadAll, vacationsModel]
  );

  return (
    <div>
      <Header
        content="Vacation picker"
        rightIcon={
          <Link href="/">
            <Image src={closeLogo.src} alt="image button" width={30} height={30} />
          </Link>
        }
      />
      <MultiDatesPicker selectedDates={vacations.map((v) => new Date(v.vacationDate))} onDatesChange={saveDates} />
    </div>
  );
}
