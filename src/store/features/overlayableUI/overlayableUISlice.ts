import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store";

type OverlayableMap = {
  [id: string]: Overlayable;
};
type OverlayableState = OverlayableMap;
export interface OverlayableMeta {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
}
export type OverlayableType = "modals" | "drawers";
type Overlayable = {
  id: string;
  type: OverlayableType;
  open: boolean;
  meta?: OverlayableMeta;
};

// const MODALS: ModalMap = {
//   ViewProductModal: {
//     id: "ViewProductModal",
//     open: false,
//     meta: {
//       isOfferExpired: true,
//     },
//   },
// };
type OpenOverlayablePayload = {
  overlayableFileName: string;
  type: OverlayableType;
  meta: OverlayableMeta;
};
const initialState: OverlayableState = {};
const overlayableUISlice = createSlice({
  name: "overlayableUI",
  initialState,
  reducers: {
    openOverlayable(
      overlayableUI,
      action: PayloadAction<OpenOverlayablePayload>
    ) {
      const { overlayableFileName: id, meta, type } = action.payload;
      overlayableUI[id] = { id, type, open: true, meta };
    },
    closeOverlayable(overlayableUI, action: PayloadAction<string>) {
      const id = action.payload;
      overlayableUI[id].open = false;
      overlayableUI[id].meta = {};
    },
    closeAllOverlayable() {
      return {};
    },
  },
});

export const { openOverlayable, closeOverlayable, closeAllOverlayable } =
  overlayableUISlice.actions;
// selectors
export const openedOverlayableSelector = createSelector(
  (rootState: RootState) => rootState.overlayableUI,
  (overlayableUI) => Object.values(overlayableUI).filter(({ open }) => open)
);

export const isLastOpenedOverlayableSelector = createSelector(
  (rootState: RootState) => rootState.overlayableUI,
  (overlayableUI) =>
    Boolean(
      Object.values(overlayableUI).filter(({ open }) => open).length === 1
    )
);

export default overlayableUISlice.reducer;
