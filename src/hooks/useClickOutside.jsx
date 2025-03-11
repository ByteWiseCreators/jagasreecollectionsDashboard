import { useCallback, useEffect } from "react";

const useClickOutside = ({ ref, handler }) => {
  console.log("useClickOutside");
  const listener = useCallback((e) => {
    if (!ref.current || ref.current.contains(e.target)) return;
    handler(e);
  }, [handler, ref]);
  
  useEffect(() => {
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [ref, handler, listener]);
};

export default useClickOutside;
