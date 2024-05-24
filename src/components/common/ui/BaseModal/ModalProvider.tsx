import { selectOpenedModals } from "@store/features/overlayableUI/overlayableUISlice";
import { LazyModal } from "@components/common/utils";
import { useAppSelector } from "@store/hooks";
import { Outlet } from "react-router-dom";

function ModalProvider() {
  const openedModals = useAppSelector(selectOpenedModals);
  return (
    <>
      {openedModals.map(({ id }) => (
        <LazyModal key={id} fileName={id} />
      ))}
      <Outlet />
    </>
  );
}

export default ModalProvider;
