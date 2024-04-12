import { useParams } from 'react-router-dom';
import useBlog from '../../hooks/useBlog';
import { Loading } from '../../utils';

function DynamicBlogCrumb() {
  const { id } = useParams();
  const { blog, isFetching, error } = useBlog(id);
  // TODO: fetch blog name here
  return (
    <Loading
      isFetching={isFetching}
      renderLoader={<span>Loading</span>}
      error={error}
    >
      {blog?.title}
    </Loading>
  );
}

export default DynamicBlogCrumb;
