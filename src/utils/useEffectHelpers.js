import { useRef, useEffect } from 'react';
import isEqual from 'lodash/isEqual';

export function useDeepEqualEffect(fn, deps) {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    const isSame = prevDeps.current.every((obj, index) =>
      isEqual(obj, deps[index]),
    );

    if (isFirst.current || !isSame) {
      fn();
    }

    isFirst.current = false;
    prevDeps.current = deps;
  }, [fn, deps]);
}
