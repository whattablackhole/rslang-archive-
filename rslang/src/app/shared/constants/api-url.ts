import { BASE_URL } from './base-url';

export const API_URL = {
  WORDS: `${BASE_URL}/words?`,
  WORDS_COUNT: `${BASE_URL}/words/count?`,
  WORD_BY_ID: (id: string): string => `${BASE_URL}/words/${id}?`,
  USER_WORDS: (userId: string): string => `${BASE_URL}/users/${userId}/words`,
  USER_WORD_BY_ID: (userId: string, wordId: string): string => `${BASE_URL}/users/${userId}/words/${wordId}`,
  USER_SETTINGS: (userId: string): string => `${BASE_URL}/users/${userId}/settings`,
  USER_STATISTICS: (userId: string): string => `${BASE_URL}/users/${userId}/statistics`,
};
