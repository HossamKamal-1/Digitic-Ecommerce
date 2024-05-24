import { BlogCard } from "@components/blog";
import { Loading, RenderList } from "@components/common/utils";
import "./Blogs.scss";
import { NavigationBox } from "@components/layout";
import { useGetBlogsQuery } from "@store/features/products/productsSlice";
function Blogs() {
  const { data: blogs, isLoading, error } = useGetBlogsQuery();
  // TODO: paginate blogs on scroll
  // TODO: implement loading spinners
  return (
    <main className="blogs">
      <div className="container">
        <div className="blogs__content-wrapper">
          <div className="blogs__navigation-box-wrapper">
            <NavigationBox  />
          </div>
          <div className="blogs__content">
            <Loading
              renderLoader={<span>Loading</span>}
              error={error}
              isFetching={isLoading}
            >
              <RenderList
                items={blogs}
                renderItem={(blog) => <BlogCard key={blog.id} blog={blog} />}
              />
            </Loading>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Blogs;
