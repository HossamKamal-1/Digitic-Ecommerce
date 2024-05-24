function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  }
): string {
  const d = new Date(date);
  const DATE_TIME_FORMATTER = new Intl.DateTimeFormat(undefined, options);
  return DATE_TIME_FORMATTER.format(d);
}

export default formatDate;
