import "./Slidable.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, ReactNode, useEffect, useRef, useState } from "react";

type SlidableProps<TItem> = {
  headingTitle: string;
  // FIXME: fix spacebetween slides here or the component itself
  spaceBetweenSlides?: `${number}px` | `${number}rem`;
  renderItem?: (item: TItem, index?: number) => JSX.Element;

  children?: ReactNode;
  items?: TItem[];
};
const slidingAmount = 300;
function Slidable<TItem>({
  items,
  headingTitle,
  children,
  spaceBetweenSlides = "10px",
  renderItem,
}: SlidableProps<TItem>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isLeftBtnDisabled, setIsLeftBtnDisabled] = useState(false);
  const [isRightBtnDisabled, setIsRightBtnDisabled] = useState(false);
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeHandler = () => {
      if (!containerRef.current) return;
      setIsLeftBtnDisabled(0 >= translateX);
      setIsRightBtnDisabled(
        translateX + containerRef.current.clientWidth >=
          containerRef.current.scrollWidth
      );
    };
    const resizeObs = new ResizeObserver(resizeHandler);
    resizeObs.observe(containerRef.current);
    return () => {
      resizeObs.disconnect();
    };
  }, [translateX]);
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeHandler = () => {
      if (!containerRef.current) return;
      setTranslateX(0);
    };
    const resizeObs = new ResizeObserver(resizeHandler);
    resizeObs.observe(containerRef.current);
    return () => {
      resizeObs.disconnect();
    };
  }, []);
  function handlePrevClick() {
    setTranslateX((prevTranslateX) => {
      const newTranslateX =
        prevTranslateX - slidingAmount - parseInt(spaceBetweenSlides);
      if (newTranslateX < 0) {
        console.log(newTranslateX);
        console.log("under 0 or equal");
        return 0;
      }
      return prevTranslateX - slidingAmount - parseInt(spaceBetweenSlides);
    });
  }
  function handleNextClick() {
    console.log("gap in px", parseInt(spaceBetweenSlides));

    setTranslateX((prevTranslateX) => {
      if (!containerRef.current) return 0;
      const newTranslateX =
        prevTranslateX + slidingAmount + parseInt(spaceBetweenSlides);
      const remaniningVisibleWidth =
        containerRef.current.scrollWidth - containerRef.current.clientWidth;
      if (newTranslateX > remaniningVisibleWidth) {
        return remaniningVisibleWidth;
      }
      return newTranslateX;
    });
  }
  return (
    <section className="slidable-section">
      <div className="container">
        <div className="content">
          <div className="heading-wrapper">
            <h3 className="heading">{headingTitle}</h3>
            <div className="slide-btns-wrapper">
              <button
                className="slide-btn"
                onClick={() => handlePrevClick()}
                disabled={isLeftBtnDisabled}
              >
                <ChevronLeft />
              </button>
              <button
                className="slide-btn"
                onClick={() => handleNextClick()}
                disabled={isRightBtnDisabled}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="items-wrapper" ref={containerRef}>
            <div
              className="slidable-content"
              style={{
                gap: spaceBetweenSlides,
                transform: `translateX(${-translateX}px)`,
              }}
            >
              {children ||
                items?.map((item, index) => renderItem?.(item, index))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Slidable;
