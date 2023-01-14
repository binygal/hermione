import React from 'react';
import LocalDBConnector from '../../data/LocalDBConnector';
import LocalDBProvider from '../../data/LocalDBProvider';
import RecordsRepository from '../../data/RecordsRepository';
import SettingsModel, { ISettingsModel } from '../../settings/SettingsModel';
import SettingsRepository from '../../settings/SettingsRepository';
import RecordsModel, { IRecordsModel } from './RecordsModel';

export interface IMainModel {
  readonly recordsModel: IRecordsModel;
  readonly settingsModel: ISettingsModel;
}

export type MainModelContextValue = {
  model: IMainModel
};

export class MainModel implements IMainModel {
  readonly recordsModel: IRecordsModel;

  readonly settingsModel: ISettingsModel;

  constructor() {
    const dbProvider = new LocalDBProvider();
    const dbConnector = new LocalDBConnector(dbProvider);
    const recordsRepository = new RecordsRepository(dbConnector);
    const settingsRepository = new SettingsRepository(dbConnector);

    this.recordsModel = new RecordsModel(recordsRepository, settingsRepository);

    this.settingsModel = new SettingsModel(settingsRepository);
  }
}

export default React.createContext<MainModelContextValue>({
  model: new MainModel(),
});
