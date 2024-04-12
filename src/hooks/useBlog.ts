import { Blog } from '../components/BlogCard/BlogCard';
import EcommerceClient from '../services/ecommerceApi';
import { useAxios } from './useAxios';

const useBlog = (blogId: string | undefined) => {
  const { responseData: blog, ...rest } = useAxios<Blog>(
    {
      url: `/blogs/${blogId}`,
    },
    EcommerceClient
  );
  return { blog, ...rest };
};
export default useBlog;
