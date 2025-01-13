import loadash from "lodash"
import { useEffect, useMemo, useRef } from "react";
const useDebounce = (callback:any,delay:number) => {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref?.current?.();
    };

    return loadash.debounce(func, delay);
  }, []);

  return debouncedCallback;
};

export default useDebounce;