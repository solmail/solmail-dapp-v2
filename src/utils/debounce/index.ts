export const debounceAsync = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let resolver: ((value: any) => void) | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (timer) clearTimeout(timer);

    return new Promise((resolve) => {
      resolver = resolve;
      timer = setTimeout(async () => {
        const result = await fn(...args);
        resolver?.(result);
      }, delay);
    });
  };
};
