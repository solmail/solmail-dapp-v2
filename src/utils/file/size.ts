export const isGreaterThanMB = (bytes: number, xMB: number) => {
  const limit = xMB * 1024 * 1024; // convert MB to bytes
  return bytes > limit;
};
