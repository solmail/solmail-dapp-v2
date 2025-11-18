export const getByteSize = (value: string) => {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(value);
  return encoded.length;
};
