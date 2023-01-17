import { convertDateToDateString } from '../common/extensions/date';
import { Vacation } from '../data/data.types';
import { IVacationsRepository } from './VacationsRepository';

export type StringifiedVacation = {
  id: string;
  vacation: string;
};

export interface IVacationsModel {
  add(vacation: Vacation): Promise<void>
  remove(id: string): Promise<void>
  getAll(): Promise<StringifiedVacation[]>
}

export default class VacationsModel implements IVacationsModel {
  private repository: IVacationsRepository;

  constructor(vacationsRepository: IVacationsRepository) {
    this.repository = vacationsRepository;
  }

  add(vacation: Vacation): Promise<void> {
    return this.repository.add(vacation);
  }

  remove(id: string): Promise<void> {
    return this.repository.remove(id);
  }

  async getAll(): Promise<StringifiedVacation[]> {
    const vacations = await this.repository.getAll();
    const stringifiedVacations = vacations
      .map((v) => ({ id: v.id, vacation: convertDateToDateString(new Date(v.vacationDate)) }));
    return stringifiedVacations;
  }
}
