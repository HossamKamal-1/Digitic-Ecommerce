import { useEffect, useMemo, useState } from "react";
type MediaString = `(${"max" | "min"}-width: ${number}px)`;
const useMediaQuery = (mediaQuery: MediaString) => {
  const mediaQueryList = useMemo(() => matchMedia(mediaQuery), [mediaQuery]);
  const [isMediaQueryMatches, setIsMediaQueryMatches] = useState(
    mediaQueryList.matches
  );
  useEffect(() => {
    const mediaQueryChangeHandler = (e: MediaQueryListEvent) => {
      setIsMediaQueryMatches(e.matches);
    };
    mediaQueryList.addEventListener("change", mediaQueryChangeHandler);
    return () => {
      mediaQueryList.removeEventListener("change", mediaQueryChangeHandler);
    };
  }, [mediaQueryList]);
  return isMediaQueryMatches;
};
export default useMediaQuery;
