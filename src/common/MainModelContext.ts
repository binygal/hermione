import React from 'react';
import LocalDBConnector from '../data/LocalDBConnector';
import LocalDBProvider from '../data/LocalDBProvider';
import RecordsRepository from '../data/RecordsRepository';
import RecordsModel, { IRecordsModel } from './RecordsModel';

export interface IMainModel {
  readonly recordsModel: IRecordsModel;
}

export type MainModelContextValue = {
  model: IMainModel
};

export class MainModel implements IMainModel {
  readonly recordsModel: IRecordsModel;

  constructor() {
    const dbProvider = new LocalDBProvider();
    const dbConnector = new LocalDBConnector(dbProvider);
    const recordsRepository = new RecordsRepository(dbConnector);
    this.recordsModel = new RecordsModel(recordsRepository);
  }
}

export default React.createContext<MainModelContextValue>({
  model: new MainModel(),
});
