import {
  closeAllOverlayable,
  openedOverlayableSelector,
} from "@store/features/overlayableUI/overlayableUISlice";
import { LazyOverlayable } from "@components/common/utils";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { clearAllBodyScrollLocks } from "body-scroll-lock";

function OverlayableManager() {
  const openedOverlayables = useAppSelector(openedOverlayableSelector);
  const totalOpenedOverlayablesRef = useRef(openedOverlayables.length);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    totalOpenedOverlayablesRef.current = openedOverlayables.length;
  }, [openedOverlayables.length]);
  useEffect(() => {
    console.log({
      totalOpenedOverlayables: totalOpenedOverlayablesRef.current,
    });
    if (totalOpenedOverlayablesRef.current) {
      clearAllBodyScrollLocks();
      dispatch(closeAllOverlayable());
    }
  }, [location.pathname, dispatch]);
  return (
    <>
      {openedOverlayables.map(({ id, type }) => (
        <LazyOverlayable key={id} fileName={id} type={type} />
      ))}
      <Outlet />
    </>
  );
}

export default OverlayableManager;
