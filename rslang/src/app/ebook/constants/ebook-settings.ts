export const EBOOK_SETTINGS = {
  currentState: {
    group: 1,
    page: 1,
  },
  userName: 'User',
  buttonOptions: [
    {
      value: 'isDifficult',
      label: 'Show "difficult word" button',
      checked: true,
    },
    {
      value: 'isRemote',
      label: 'Show "delete word" button',
      checked: true,

    },
  ],
  wordOptions: [
    {
      value: 'translationOfWord',
      label: 'Show translation word',
      checked: true,
    },
    {
      value: 'examplesOfUse',
      label: 'Show examples of use',
      checked: false,
    },
    {
      value: 'translationOfExamples',
      label: 'Show translation examples',
      checked: true,
    },
  ],
};
