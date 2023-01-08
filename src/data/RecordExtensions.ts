import { v4 } from 'uuid';
import type { Record as RecordType } from './data.types';

export default class Record {
  static now(): RecordType {
    return { id: v4(), startTime: Date.now() };
  }
}
