const BASE_URL = 'https://afternoon-falls-25894.herokuapp.com';

export const GLOBAL_DATA = {
  WORDS: `${BASE_URL}/words?`,
  WORDS_COUNT: `${BASE_URL}/words/count?`,
  WORD_BY_ID: (id: string): string => `${BASE_URL}/words/${id}?`,
  USER_WORDS: (userId: string): string => `${BASE_URL}/users/${userId}/words`,
  USER_WORD_BY_ID: (userId: string, wordId: string): string => `${BASE_URL}/users/${userId}/words/${wordId}`,
  USER_SETTINGS: (userId: string): string => `${BASE_URL}/users/${userId}/settings`,
};
