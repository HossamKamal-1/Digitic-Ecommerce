import { ReactNode } from 'react';
import './Drawer.scss';
type DrawerDirection = 'right' | 'left';
export type DrawerProps = {
  direction: DrawerDirection;
  open: boolean;
  children: ReactNode;
  onClose: () => void;
  className?: string;
};
function Drawer({
  children,
  direction,
  open,
  onClose,
  className = '',
}: DrawerProps) {
  return (
    <>
      <div
        className={`drawer ${className}`}
        style={{
          [direction]: open ? '0' : '-100%',
          transition: `${direction} 0.3s`,
        }}
      >
        {children}
      </div>
      <div
        className="overlay"
        style={{
          opacity: open ? '1' : '0',
          zIndex: open ? '1000000' : '-1',
        }}
        onClick={() => onClose()}
      />
    </>
  );
}

export default Drawer;
