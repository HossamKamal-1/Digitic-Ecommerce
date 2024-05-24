import useDrawer from "@hooks/useDrawer";
import BaseModal, {
  BaseModalPropsWithoutChildren,
} from "../../BaseModal/BaseModal";
import { Link } from "react-router-dom";

type TestModalProps = BaseModalPropsWithoutChildren;
function TestModal({ isOpen, onClose }: TestModalProps) {
  const { onOpen: showCartDrawer } = useDrawer("CartDrawer");
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      TestModal
      <Link to="/products/3">click product</Link>
      <button onClick={() => showCartDrawer({})}>e </button>
    </BaseModal>
  );
}

export default TestModal;
