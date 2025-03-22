import { Vacation } from "../data/data.types";
import { IVacationsRepository } from "./VacationsRepository";

export interface IVacationsModel {
  add(vacation: Vacation): Promise<void>;
  remove(id: string): Promise<void>;
  getVacationDates(): Promise<Vacation[]>;
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

  async getVacationDates(): Promise<Vacation[]> {
    const vacations = await this.repository.getAll();
    return vacations;
  }
}
