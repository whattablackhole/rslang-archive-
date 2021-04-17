import { Statistics } from './statistics-short.model';

export interface BackEndStatistics {
  userId: string;
  optional: Statistics[]
}
