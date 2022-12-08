import { useRef } from "react";
export var useLatest = function useLatest(value) {
  var ref = useRef(value);
  ref.current = value;
  return ref;
};