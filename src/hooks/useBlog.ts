import { TBlog } from "@custom-types/blog";
import EcommerceClient from "../services/ecommerce";
import { useAxios } from "./useAxios";

const useBlog = (blogId: string | undefined) => {
  const { responseData: blog, ...rest } = useAxios<TBlog>(
    {
      url: `/blogs/${blogId}`,
    },
    EcommerceClient
  );
  return { blog, ...rest };
};
export default useBlog;
