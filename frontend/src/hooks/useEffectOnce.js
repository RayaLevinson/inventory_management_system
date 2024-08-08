import { useEffect, useRef } from "react";

export default function useEffectOnce(callback) {
  const once = useRef(false);

  useEffect(() => {
    if (once.current) return;

    callback();

    once.current = true;
  }, [callback]);
}
