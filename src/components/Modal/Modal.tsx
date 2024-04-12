import './Modal.scss';
import { MouseEvent, ReactNode, useRef } from 'react';
import { X } from 'lucide-react';
type ModalProps = {
  onClose: () => void;
  children: ReactNode;
  open: boolean;
};
function Modal({ onClose, open, children }: ModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);
  function handleModalClose(e: MouseEvent<HTMLDivElement>) {
    if (!modalContentRef.current) return;
    if (!modalContentRef.current.contains(e.target as Node)) {
      onClose();
    }
  }
  return (
    <div className={`modal ${open ? 'open' : ''}`} onClick={handleModalClose}>
      <div className="modal-content" ref={modalContentRef}>
        <button className="close-btn" onClick={() => onClose()}>
          <X size={16}  fontWeight='bold' className='icon' />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
