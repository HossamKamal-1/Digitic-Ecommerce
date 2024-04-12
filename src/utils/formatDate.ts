const DATE_TIME_FORMATTER = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});
function formatDate(date: Date): string {
  const d = new Date(date);
  return DATE_TIME_FORMATTER.format(d);
}

export default formatDate;
