function calcOfferRemainingTime(offerExpirationDate: Date) {
  const offerDate = new Date(offerExpirationDate);
  const currentDate = new Date();
  const remainingOfferTimeInMilliSeconds =
    offerDate.getTime() - currentDate.getTime();
  return remainingOfferTimeInMilliSeconds;
}

function isOfferTimeElapsed(offerExpirationDate: Date) {
  return calcOfferRemainingTime(offerExpirationDate) <= 0;
}
export { calcOfferRemainingTime, isOfferTimeElapsed };
