import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(setDebouncedValue, delay, value);
    return () => clearTimeout(timeoutId);
  }, [delay, value]);
  return debouncedValue;
};
export default useDebounce;
