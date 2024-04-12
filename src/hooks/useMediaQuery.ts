import { useCallback, useEffect, useState } from 'react';

const useMediaQuery = (mediaQuery: string) => {
  const isMediaQueryMatchesStateInitializer = useCallback(
    () => matchMedia(mediaQuery).matches,
    [mediaQuery]
  );

  const [isMediaQueryMatches, setIsMediaQueryMatches] = useState(
    isMediaQueryMatchesStateInitializer
  );
  useEffect(() => {
    const resizeHandler = () => {
      setIsMediaQueryMatches(matchMedia(mediaQuery).matches);
    };
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [mediaQuery]);
  return isMediaQueryMatches;
};
export default useMediaQuery;
