import { Blog } from "../components/blog/BlogCard/BlogCard";
import EcommerceClient from "../services/ecommerce";
import { useAxios } from "./useAxios";

const useBlogs = () => {
  const { responseData: blogs, ...rest } = useAxios<Blog[]>(
    {
      url: "/blogs",
    },
    EcommerceClient
  );
  return { blogs, ...rest };
};

export default useBlogs;
