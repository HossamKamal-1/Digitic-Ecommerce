import { ReactNode } from 'react';
type RenderListProps<T> = {
  items: T[] | null;
  renderItem: (item: T, index: number) => ReactNode;
};
const RenderList = <T,>({ renderItem, items }: RenderListProps<T>) => {
  return items?.map((item, index) => renderItem(item, index));
};
export default RenderList;
