export const EBOOK_SETTINGS = {
  currentState: {
    group: 0,
    page: 0,
  },
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
      checked: false,
    },
    {
      value: 'translationOfExample',
      label: 'Show translation example',
      checked: true,
    },
  ],
};
