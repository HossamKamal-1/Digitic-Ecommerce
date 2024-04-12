import { formatDate } from '../../utils';
import './BlogCard.scss';
import { Link } from 'react-router-dom';
type Author = {
  id: number;
  name: string;
};
export type BlogComment = {
  blogId: number;
  id: number;
  author: Author;
  body: string;
  createdAt: Date;
};
export type Blog = {
  id: number;
  title: string;
  description: string;
  date: Date;
  img: string;
  author: Author;
  comments: BlogComment[];
};
type BlogCardProps = {
  blog: Blog;
};
function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="blog-card">
      <Link to={`/blogs/${blog.id}`} className="img-link">
        <img src={blog.img} alt={blog.title} />
      </Link>
      <div className="blog-card-body">
        <span className="date">{formatDate(blog.date)}</span>
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
