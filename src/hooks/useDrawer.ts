import {
  openOverlayable,
  openedOverlayableSelector,
} from "@store/features/overlayableUI/overlayableUISlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import DRAWERS from "@components/common/ui/drawers";
import { ComponentProps } from "react";
import type { DrawerPropsWithoutChildren } from "@components/common/ui/Drawer/Drawer";
import useBodyScrollLock from "./useBodyScrollLock";

type DrawerFileName = keyof typeof DRAWERS;
type DrawerProps<TFileName extends DrawerFileName> = Omit<
  ComponentProps<(typeof DRAWERS)[TFileName]>,
  keyof DrawerPropsWithoutChildren
>;

const useDrawer = <TDrawerFileName extends DrawerFileName>(
  DrawerFileName: TDrawerFileName
) => {
  const dispatch = useAppDispatch();
  const openedOverlayablesList = useAppSelector(openedOverlayableSelector);
  const { scrollLock } = useBodyScrollLock();
  const onOpen = (props: DrawerProps<TDrawerFileName>) => {
    console.log({ DrawerFileName, props });
    if (!openedOverlayablesList.length) {
      console.log("scroll lock");
      scrollLock();
    }
    dispatch(
      openOverlayable({
        overlayableFileName: DrawerFileName,
        type: "drawers",
        meta: props ?? {},
      })
    );
  };

  return { onOpen };
};
export default useDrawer;
