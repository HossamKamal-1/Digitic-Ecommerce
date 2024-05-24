import { useEffect, useState, useTransition } from "react";
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    let prevScrollY = window.scrollY;
    const scrollHandler = () => {
      // console.log({ scrollDir: scrollY > prevScrollY ? 'down' : 'up' });
      startTransition(() => {
        setScrollDirection(scrollY > prevScrollY ? "down" : "up");
        prevScrollY = window.scrollY;
      });
    };
    // window.addEventListener('touchmove', scrollHandler);
    window.addEventListener("scroll", scrollHandler);
    return () => {
      // window.removeEventListener('touchmove', scrollHandler);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  return scrollDirection;
};
export default useScrollDirection;
