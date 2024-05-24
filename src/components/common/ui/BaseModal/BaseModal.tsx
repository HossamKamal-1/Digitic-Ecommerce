import "./BaseModal.scss";
import { ReactNode } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import Overlay from "../Overlay/Overlay";

const layersWrapper = document.getElementById("layersWrapper") as Element;
type BaseModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};
export type BaseModalPropsWithoutChildren = Omit<BaseModalProps, "children">;
function BaseModal({ children, isOpen, onClose }: BaseModalProps) {
  console.log("Modal Rendered");
  function handleModalClose() {
    onClose();
    console.log("close modal");
  }
  return createPortal(
    <>
      <Overlay onClick={handleModalClose} open={isOpen}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <button className="close-btn" onClick={() => onClose()}>
              <X size={16} fontWeight="bold" className="icon" />
            </button>
            {children}
          </div>
        </div>
      </Overlay>
    </>,
    layersWrapper
  );
}

export default BaseModal;
