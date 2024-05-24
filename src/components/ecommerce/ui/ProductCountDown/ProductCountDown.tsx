import { useCallback, useEffect, useState } from "react";
import {
  calcOfferRemainingTime,
  formatTime,
  isOfferTimeElapsed,
  pluralize,
} from "@utils";

export type ProductCountDownProps = {
  productExpirationDate: Date | undefined;
  onOfferExpire?: () => void;
};
function ProductCountDown({
  productExpirationDate,
  onOfferExpire,
}: ProductCountDownProps) {
  const offerCountdownStateInitializer = useCallback(() => {
    if (!productExpirationDate) return undefined;
    return isOfferTimeElapsed(productExpirationDate)
      ? {
          days: 0,
          hrs: 0,
          mintues: 0,
          seconds: 0,
        }
      : undefined;
  }, [productExpirationDate]);
  const [offerCountdownTime, setOfferCountdownTime] = useState(
    offerCountdownStateInitializer
  );
  const isOfferExpired =
    typeof offerCountdownTime === "object" &&
    Object.values(offerCountdownTime).every((time) => time === 0);
  useEffect(() => {
    if (!productExpirationDate) return;
    if (isOfferTimeElapsed(productExpirationDate)) {
      onOfferExpire?.();
      return;
    }
    const offerExpirationDate = new Date(productExpirationDate);
    const countDownHandler = () => {
      const remainingOfferTimeInMs =
        calcOfferRemainingTime(offerExpirationDate);
      if (remainingOfferTimeInMs <= 0) {
        onOfferExpire?.();
        clearInterval(interval);
        return;
      }
      const days = Math.trunc(remainingOfferTimeInMs / (1000 * 60 * 60 * 24));
      const hrs = Math.trunc(
        (remainingOfferTimeInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mintues = Math.trunc(
        (remainingOfferTimeInMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.trunc((remainingOfferTimeInMs % (1000 * 60)) / 1000);
      setOfferCountdownTime({
        days,
        hrs,
        mintues,
        seconds,
      });
    };
    const interval = setInterval(countDownHandler, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [productExpirationDate]);

  return (
    <>
      {offerCountdownTime && (
        <>
          <div className="special-product__offer-date-wrapper">
            <div className="special-product__offer-day-wrapper">
              <span className="special-product__offer-day">
                {offerCountdownTime.days}
              </span>
              {pluralize(offerCountdownTime.days, "day", "days")}
            </div>
            <div className="special-product__countdown-wrapper">
              <span className="special-product__countdown">
                {formatTime(offerCountdownTime.hrs)}
              </span>
              <span className="special-product__countdown">
                {formatTime(offerCountdownTime.mintues)}
              </span>
              <span className="special-product__countdown">
                {formatTime(offerCountdownTime.seconds)}
              </span>
            </div>
          </div>
          {isOfferExpired && (
            <div className="special-product__expired">Offer Expired</div>
          )}
        </>
      )}
    </>
  );
}
export default ProductCountDown;
