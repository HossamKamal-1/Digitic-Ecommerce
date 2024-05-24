/**
 * A function that takes a queryKey and list and returns url search query string
 *
 * @param queryKey - a string to represent search query key by default is 'id'
 * @param list - list of numbers or strings
 * @returns key=value string search query separated by '&'
 * - Example: getUniformStringQueryFromList('id',[1,2]) => 'id=1&id=2'
 */
const getUniformStringQueryFromList = (
  list: string[] | number[],
  queryKey = "id"
) => {
  return list.map((queryValue) => `${queryKey}=${queryValue}`).join("&");
};
export default getUniformStringQueryFromList;
