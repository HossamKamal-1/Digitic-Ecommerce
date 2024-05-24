import { Suspense, lazy, useCallback, useMemo } from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  OverlayableType,
  closeOverlayable,
  isLastOpenedOverlayableSelector,
} from "@store/features/overlayableUI/overlayableUISlice";
import useBodyScrollLock from "@hooks/useBodyScrollLock";

type LazyOverlayableProps = {
  fileName: string;
  type: OverlayableType;
};
function LazyOverlayable({ fileName, type }: LazyOverlayableProps) {
  const open = useAppSelector(
    (rootState) => rootState.overlayableUI[fileName]?.open ?? false
  );
  const overlayableProps = useAppSelector(
    (rootState) => rootState.overlayableUI[fileName]?.meta ?? {}
  );
  const dispatch = useAppDispatch();
  const { scrollUnlock } = useBodyScrollLock();
  const isLastOpenedOverlayable = useAppSelector(
    isLastOpenedOverlayableSelector
  );
  const hideOverlayable = useCallback(() => {
    if (isLastOpenedOverlayable) {
      scrollUnlock();
    }
    dispatch(closeOverlayable(fileName));
  }, [dispatch, fileName, scrollUnlock, isLastOpenedOverlayable]);
  console.log(`loading ./${fileName}/${fileName}.tsx`);
  const Component = useMemo(
    () => lazy(() => import(`../../ui/${type}/${fileName}/${fileName}.tsx`)),
    [fileName, type]
  );
  return (
    <ErrorBoundary
      renderErrorFallback={(error) => (
        <p>
          Error happend while importing "{fileName}": {error?.message}
        </p>
      )}
    >
      <Suspense fallback={null}>
        {fileName ? (
          <Component
            {...overlayableProps}
            isOpen={open}
            onClose={hideOverlayable}
          />
        ) : null}
      </Suspense>
    </ErrorBoundary>
  );
}
export default LazyOverlayable;
