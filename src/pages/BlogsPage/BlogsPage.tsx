import { BlogCard, NavigationBox } from '../../components';
import useBlogs from '../../hooks/useBlogs';
import { Loading, RenderList } from '../../utils';
import './BlogsPage.scss';
function BlogsPage() {
  const { blogs, error, isFetching } = useBlogs();
  // TODO: implement loading spinners
  return (
    <main className="blogs">
      <div className="container">
        <div className="blogs__content-wrapper">
          <NavigationBox />
          <div className="blogs__content">
            <Loading
              renderLoader={<span>Loading</span>}
              error={error}
              isFetching={isFetching}
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

export default BlogsPage;
