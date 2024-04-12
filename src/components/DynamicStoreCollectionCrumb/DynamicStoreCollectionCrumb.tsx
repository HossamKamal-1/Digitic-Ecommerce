import { useParams } from 'react-router-dom';

function DynamicStoreCollectionCrumb() {
  const { prefix } = useParams();

  return prefix;
}
export default DynamicStoreCollectionCrumb;
