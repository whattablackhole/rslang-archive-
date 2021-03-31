export const EBOOK_SETTINGS = {
  currentState: {
    group: 0,
    page: 0,
  },
  buttonOptions: [
    {
      value: 'isDifficult',
      label: 'Difficult word',
      checked: true,
    },
    {
      value: 'isRemote',
      label: 'Delete word',
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
      value: 'translationOfExample',
      label: 'Show translation example',
      checked: true,
    },
  ],
};
