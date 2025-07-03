import '@testing-library/jest-dom'
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});

  jest.spyOn(console, 'warn').mockImplementation((msg) => {
    if (
      typeof msg === 'string' &&
      msg.includes('React Router Future Flag Warning')
    ) {
      return;
    }
    // @ts-ignore
    return console.warn.original ? console.warn.original(msg) : undefined;
  });
});

afterAll(() => {
  // @ts-ignore
  if (console.warn.mockRestore) console.warn.mockRestore();

  (console.error as jest.Mock).mockRestore?.();
});