export const mock = () => ({
  getHours: (() => 0),
  getMinutes: (() => 0),
  getSeconds: (() => 0),
  getMilliseconds: (() => 0),
});

export const real = () =>
  new Date();
