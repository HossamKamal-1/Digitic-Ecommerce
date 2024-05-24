import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useCallback } from "react";
const useBodyScrollLock = () => {
  const scrollUnlock = useCallback(() => {
    enableBodyScroll(document.body);
  }, []);
  function scrollLock() {
    disableBodyScroll(document.body, {
      reserveScrollBarGap: true,
    });
  }
  return { scrollLock, scrollUnlock };
};
export default useBodyScrollLock;
