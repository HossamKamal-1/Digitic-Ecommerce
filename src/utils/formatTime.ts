export const TIME_FORMATTER = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});


export const formatTime = (time: number): string => {
  return TIME_FORMATTER.format(time)
}

export default formatTime;

