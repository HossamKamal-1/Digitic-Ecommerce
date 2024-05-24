import { openOverlayable } from "@store/features/overlayableUI/overlayableUISlice";
import { useAppDispatch } from "@store/hooks";
import MODALS from "@components/common/ui/modals";
import { ComponentProps } from "react";
import type { BaseModalPropsWithoutChildren } from "@components/common/ui/BaseModal/BaseModal";
import useBodyScrollLock from "./useBodyScrollLock";

type ModalFileName = keyof typeof MODALS;
type ModalProps<TFileName extends ModalFileName> = Omit<
  ComponentProps<(typeof MODALS)[TFileName]>,
  keyof BaseModalPropsWithoutChildren
>;

const useModal = <TModalFileName extends ModalFileName>(
  modalFileName: TModalFileName
) => {
  const dispatch = useAppDispatch();
  const { scrollLock } = useBodyScrollLock();
  const onOpen = (props: ModalProps<TModalFileName>) => {
    console.log({ modalFileName, props });
    scrollLock();
    dispatch(
      openOverlayable({
        overlayableFileName: modalFileName,
        type: "modals",
        meta: props ?? {},
      })
    );
  };

  return { onOpen };
};
export default useModal;
