import {
  Children,
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import './CustomSlider.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type SliderItemRef = HTMLDivElement;
type SliderItemProps = {
  children: ReactNode;
} & Pick<ComponentPropsWithoutRef<'div'>, 'style' | 'className'>;
const SliderItem = forwardRef<SliderItemRef, SliderItemProps>(
  function SliderItem({ children, style, className = '' }, ref) {
    return (
      <div
        className={`custom-slider-item ${className}`}
        style={style}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
// type DisplayCount =
//   | number
//   | {
//       xs?: number;
//       md?: number;
//       lg?: number;
//       xl?: number;
//     };
type CustomSliderProps = {
  children: ReactNode;
  hideControls?: boolean;
  displayCount?: number;
  infinite?: boolean;
  gap?: number;
  disablePadding?: boolean;
};
export type CustomSliderRef = {
  handleNextBtnClick: () => void;
  handlePrevBtnClick: () => void;
};
const CustomSlider = forwardRef<CustomSliderRef, CustomSliderProps>(
  function CustomSlider(
    {
      children,
      displayCount = 1,
      infinite = false,
      hideControls = false,
      gap = 0,
      disablePadding = false,
    },
    sliderControlsRef
  ) {
    const rootGapInPx = useMemo(
      () =>
        parseFloat(getComputedStyle(document.documentElement).fontSize) * gap,

      [gap]
    );
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderItemRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [translateX, setTranslateX] = useState(0);
    useImperativeHandle(sliderControlsRef, () => ({
      handleNextBtnClick,
      handlePrevBtnClick,
    }));
    const slides = useMemo(
      () =>
        Children.map(children, (child, index) => (
          <SliderItem
            ref={sliderItemRef}
            key={`slider-item-${index}`}
            style={{
              padding: disablePadding ? '0px' : undefined,
              width: `calc((100% - ${gap}rem * ${
                displayCount - 1
              }) /  ${displayCount})`,
            }}
          >
            {child}
          </SliderItem>
        )),
      [children, displayCount, gap, disablePadding]
    );
    const isNextBtnDisabled =
      !infinite &&
      Array.isArray(slides) &&
      currentSlide >= slides.length - displayCount;
    const isPrevBtnDisabled = !infinite && currentSlide === 0;
    useEffect(() => {
      if (!containerRef.current) return;
      const resizeHandler = () => {
        setCurrentSlide(0);
        setTranslateX(0);
      };
      window.addEventListener('resize', resizeHandler);
      const resizeObs = new ResizeObserver(resizeHandler);
      resizeObs.observe(containerRef.current);
      return () => {
        resizeObs.disconnect();
      };
    }, []);
    function handleNextBtnClick() {
      if (
        !sliderItemRef.current ||
        !Array.isArray(slides) ||
        !containerRef.current
      )
        return;
      if (currentSlide < slides.length - displayCount) {
        // keep moving next
        containerRef.current.style.transition = '200ms ease transform';
        setTranslateX(
          (sliderItemRef.current.clientWidth + rootGapInPx) * (currentSlide + 1)
        );
        setCurrentSlide((prevSlide) => prevSlide + 1);
        return;
      } else {
        console.log('out of bound');
        // handle infinitly
        // TODO: Handle Infinite functionality of next btn
      }
    }
    function handlePrevBtnClick() {
      if (
        !sliderItemRef.current ||
        !Array.isArray(slides) ||
        !containerRef.current
      )
        return;
      if (currentSlide <= slides.length - displayCount && currentSlide > 0) {
        setCurrentSlide((prevSlide) => prevSlide - 1);
        setTranslateX(
          (sliderItemRef.current.clientWidth + rootGapInPx) * (currentSlide - 1)
        );
      } else {
        console.log('current slide', currentSlide);
        // TODO: Handle Infinite functionality of prev btn
        console.log('out of bound');
      }
    }
    return (
      <div className="custom-slider">
        {!hideControls && Array.isArray(children) && (
          <>
            <button
              className="btn btn-left"
              onClick={() => handlePrevBtnClick()}
              disabled={isPrevBtnDisabled}
            >
              <ChevronLeft className="icon" size={40} />
            </button>
            <button
              className="btn btn-right"
              onClick={() => handleNextBtnClick()}
              disabled={isNextBtnDisabled}
            >
              <ChevronRight className="icon" size={40} />
            </button>
          </>
        )}
        <div
          className="custom-slider-content"
          ref={containerRef}
          style={{
            transform: `translateX(-${translateX}px)`,
            gap: `${gap}rem`,
          }}
        >
          {slides}
        </div>
      </div>
    );
  }
);

export default CustomSlider;
