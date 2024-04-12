export default function pluralize(
  count: number,
  singular: string,
  plural: string,
  locale?: string
) {
  const pluralRules = new Intl.PluralRules(locale);
  const numbering = pluralRules.select(count);
  switch (numbering) {
    case 'one':
      return singular;
    case 'other':
      return plural;
    default:
      throw new Error('Unknown: ' + numbering);
  }
}
