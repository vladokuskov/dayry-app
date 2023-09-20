import { useState, useEffect } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const storedValue = localStorage.getItem(key);
  const [value, setValue] = useState<T>(
    storedValue ? JSON.parse(storedValue) : initialValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export { useLocalStorage };
