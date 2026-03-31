import { useState, useEffect, useRef } from 'react';

/**
 * A custom hook to trigger a "flash" animation when a value changes.
 * Mimics high-end trading terminals where updated data highlights briefly.
 */
export function useDataTick(value: number | string) {
  const [isTickUp, setIsTickUp] = useState(false);
  const [isTickDown, setIsTickDown] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      if (typeof value === 'number' && typeof prevValue.current === 'number') {
        if (value > prevValue.current) {
          setIsTickUp(true);
          setTimeout(() => setIsTickUp(false), 800);
        } else if (value < prevValue.current) {
          setIsTickDown(true);
          setTimeout(() => setIsTickDown(false), 800);
        }
      } else {
        // Fallback for non-numerical values: just a generic flash
        setIsTickUp(true);
        setTimeout(() => setIsTickUp(false), 800);
      }
      prevValue.current = value;
    }
  }, [value]);

  return { isTickUp, isTickDown };
}
