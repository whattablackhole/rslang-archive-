import { Word } from '../../shared/models/word.model';

export interface WordStady extends Word {
  isDifficult: boolean;
  isRemove: boolean;
  toStudy: {
    usedInSprint: {
      total: number;
      successfully: number;
    };
    usedInSavannah: {
      total: number;
      successfully: number;
    };
    usedInAudiocall: {
      total: number;
      successfully: number;
    };
  };
}
