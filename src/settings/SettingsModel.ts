import { SettingsObject } from '../data/data.types';
import { ISettingsRepository } from './SettingsRepository';

export interface ISettingsModel {
  updateSettings(settings: SettingsObject): Promise<void>
  get(): Promise<SettingsObject>
}

export default class SettingsModel implements ISettingsModel {
  private settingsRepository: ISettingsRepository;

  constructor(settingsRespository: ISettingsRepository) {
    this.settingsRepository = settingsRespository;
  }

  get(): Promise<SettingsObject> {
    return this.settingsRepository.get();
  }

  updateSettings(settings: SettingsObject): Promise<void> {
    return this.settingsRepository.updateSettings(settings);
  }
}
