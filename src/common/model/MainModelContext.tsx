"use client";

import React from "react";
import LocalDBConnector from "../../data/LocalDBConnector";
import LocalDBProvider from "../../data/LocalDBProvider";
import RecordsRepository from "../../data/RecordsRepository";
import SettingsModel, { ISettingsModel } from "../../settings/SettingsModel";
import SettingsRepository from "../../settings/SettingsRepository";
import VacationsModel, { IVacationsModel } from "../../vacation-picker/VacationsModel";
import VacationsRepository from "../../vacation-picker/VacationsRepository";
import RecordsModel, { IRecordsModel } from "./RecordsModel";

export interface IMainModel {
  readonly recordsModel: IRecordsModel;
  readonly settingsModel: ISettingsModel;
  readonly vacationsModel: IVacationsModel;
}

export type MainModelContextValue = {
  model: IMainModel;
};

export class MainModel implements IMainModel {
  readonly recordsModel: IRecordsModel;

  readonly settingsModel: ISettingsModel;

  readonly vacationsModel: IVacationsModel;

  constructor() {
    const dbProvider = new LocalDBProvider();
    const dbConnector = new LocalDBConnector(dbProvider);
    const recordsRepository = new RecordsRepository(dbConnector);
    const settingsRepository = new SettingsRepository(dbConnector);
    const vacationsRepository = new VacationsRepository(dbConnector);

    this.recordsModel = new RecordsModel(
      recordsRepository,
      settingsRepository,

      vacationsRepository
    );

    this.settingsModel = new SettingsModel(settingsRepository);

    this.vacationsModel = new VacationsModel(vacationsRepository);
  }
}

const MainModelContext = React.createContext<MainModelContextValue>({
  model: new MainModel(),
});

export default MainModelContext;

export const ModelsProvider = ({ children }: React.PropsWithChildren) => (
  <MainModelContext.Provider value={{ model: new MainModel() }}>{children}</MainModelContext.Provider>
);
