import { Blog } from '../components/BlogCard/BlogCard';
import EcommerceClient from '../services/ecommerceApi';
import { useAxios } from './useAxios';

const useBlogs = () => {
  const { responseData: blogs, ...rest } = useAxios<Blog[]>(
    {
      url: '/blogs',
    },
    EcommerceClient
  );
  return { blogs, ...rest };
};

export default useBlogs;
