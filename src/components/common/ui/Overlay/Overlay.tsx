import { ReactNode } from "react";

type DurationUnit = "s" | "ms";
type OverlayProps = {
  open: boolean;
  onClick: () => void;
  transitionDuration?: `${number}${DurationUnit}`;
  children?: ReactNode;
};
function Overlay({
  open,
  children,
  onClick,
  transitionDuration = "0.1s",
}: OverlayProps) {
  return (
    <div
      onClick={() => onClick()}
      className="overlay"
      style={{
        position: "fixed",
        inset: "0",
        backgroundColor: "rgba(0,0,0,0.7)",
        opacity: open ? "1" : "1",
        zIndex: "50000",
        transition: `${transitionDuration} opacity`,
      }}
      children={children}
    />
  );
}

export default Overlay;
