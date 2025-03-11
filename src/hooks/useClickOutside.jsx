import { useCallback, useEffect } from "react";

const useClickOutside = ({ ref, handler }) => {
  const listener = useCallback((e) => {
    if (!ref.current || ref.current.contains(e.target)) return;
    handler(e);
  }, [handler, ref]);
  
  useEffect(() => {
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler, listener]);
};

export default useClickOutside;
