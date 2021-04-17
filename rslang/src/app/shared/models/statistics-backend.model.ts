import { Statistics } from './statistics-short.model';

export interface BackEndStatistics {
  id: string;
  optional: { stats:Statistics[] }
}
