import { Link } from "react-router-dom";
import { formatDate } from "@utils";
import "./BlogCard.scss";
import type { TBlog } from "@custom-types/blog";

type BlogCardProps = {
  blog: TBlog;
};
function BlogCard({ blog }: BlogCardProps) {
  const blogCreatedAt = formatDate(blog.createdAt);
  return (
    <div className="blog-card">
      <Link to={`/blogs/${blog.id}`} className="img-link">
        <img src={blog.img} alt={blog.title} />
      </Link>
      <div className="blog-card-body">
        <span className="date">{blogCreatedAt}</span>
        <h3 className="title" title={blog.title}>
          {blog.title}
        </h3>
        <p className="desc" title={blog.description}>
          {blog.description}
        </p>
        <Link to={`/blogs/${blog.id}`} className="blog-link">
          READ MORE
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
