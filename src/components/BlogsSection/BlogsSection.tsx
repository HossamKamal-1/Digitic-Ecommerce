import { SlidableSection, BlogCard } from '..';
import useBlogs from '../../hooks/useBlogs';
import { RenderList } from '../../utils';
function BlogsSection() {
  const { blogs, error, isFetching } = useBlogs();
  // TODO: show spinner and handle error
  return (
    <SlidableSection headingTitle="Our Latest News">
      <RenderList
        items={blogs}
        renderItem={(blog) => (
          <div
            key={blog.id}
            style={{
              width: '300px',
              padding: '6px',
            }}
          >
            <BlogCard blog={blog} />
          </div>
        )}
      />
    </SlidableSection>
  );
}

export default BlogsSection;
