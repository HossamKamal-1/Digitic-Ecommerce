import "./Drawer.scss";
import Overlay from "../Overlay/Overlay";
import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState } from "react";
const layersWrapper = document.getElementById("layersWrapper") as Element;
type DrawerDirection = "right" | "left";
type DrawerProps = {
  direction: DrawerDirection;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  className?: string;
};
export type DrawerPropsWithoutChildren = Omit<DrawerProps, "children">;
function Drawer({
  children,
  direction = "right",
  isOpen,
  onClose,
  className = "",
}: DrawerProps) {
  const [animateSlide, setAnimateSlide] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(setAnimateSlide, 100, true);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  function handleDrawerClose() {
    setAnimateSlide(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }
  return createPortal(
    <>
      {isOpen && (
        <>
          <div
            className={`drawer ${className}`}
            style={{
              [direction]: animateSlide ? "0" : "-100%",
              transition: `${direction} 0.3s`,
            }}
          >
            {children}
          </div>
          <Overlay open={animateSlide} onClick={handleDrawerClose} />
        </>
      )}
    </>,
    layersWrapper
  );
}

export default Drawer;
