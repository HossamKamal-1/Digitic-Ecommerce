import RenderList from "@components/common/utils/RenderList/RenderList";
import Slidable from "../Slidable/Slidable";
import { BlogCard } from "@components/blog";
import { useGetBlogsQuery } from "@store/features/products/productsSlice";
import { Loading } from "@components/common/utils";
function Blogs() {
  const {
    data: topBlogs,
    isLoading,
    error,
  } = useGetBlogsQuery({ limit: 10, page: 1 });

  // TODO: show spinner and handle error
  return (
    <Slidable headingTitle="Our Latest News">
      <Loading renderLoader="Loading" error={error} isFetching={isLoading}>
        <RenderList
          items={topBlogs}
          renderItem={(blog) => (
            <div
              key={blog.id}
              style={{
                width: "300px",
                padding: "6px",
              }}
            >
              <BlogCard blog={blog} />
            </div>
          )}
        />
      </Loading>
    </Slidable>
  );
}

export default Blogs;
