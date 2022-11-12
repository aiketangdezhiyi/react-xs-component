import { useCallback, useState } from "react";

export const useSetState = (initState) => {
  const [state, setState] = useState(initState);

  const setMergeState = useCallback((patch) => {
    setState((prevState) => {
      const newState = typeof patch === "function" ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  return [state, setMergeState];
};
