import "./Blog.scss";
import { formatDate } from "@utils";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Facebook, Twitter, Youtube } from "lucide-react";
import { BlogComments } from "@components/blog";
import { NavigationBox } from "@components/layout";
import { Loading } from "@components/common/utils";
import BlogCommentForm from "@components/forms/BlogCommentForm/BlogCommentForm";
import { useGetBlogByIdQuery } from "@store/features/products/productsSlice";
function Blog() {
  const { id: blogId } = useParams();
  const {
    data: blog,
    isLoading,
    error,
  } = useGetBlogByIdQuery(blogId as string);
  // TODO: implement loading spinners
  return (
    <main className="blog-page">
      <div className="container">
        <div className="blog-page__content-wrapper">
          <NavigationBox />
          <div className="blog-page__content">
            <Loading
              renderLoader={<span>Loading</span>}
              error={error}
              isFetching={isLoading}
            >
              {blog && (
                <>
                  <h3 className="blog-page__title">{blog.title}</h3>
                  <div className="blog-page__img-wrapper">
                    <img src={blog.img} className="blog-page__img" alt="" />
                  </div>
                  <p className="blog-page__desc">{blog.description}</p>
                  <div className="blog-page__info-wrapper">
                    <span className="blog-page__date">
                      {formatDate(blog.createdAt)}
                    </span>
                    <div className="divider" />
                    <span className="blog-page__author">
                      {blog.author.fullName}
                    </span>
                  </div>
                  <div className="blog-page__actions-wrapper">
                    <Link to="/blogs" className="blog-page__back-link">
                      <ArrowLeft />
                      Back to Blog
                    </Link>
                    <ul className="blog-page__social-list">
                      <li className="blog-page__social-item">
                        <a
                          href="#"
                          rel=""
                          target="_blank"
                          className="blog-page__social-link"
                        >
                          <Facebook className="blog-page__social-link-icon" />
                        </a>
                      </li>
                      <li className="blog-page__social-item">
                        <a
                          href="#"
                          rel=""
                          target="_blank"
                          className="blog-page__social-link"
                        >
                          <Twitter className="blog-page__social-link-icon" />
                        </a>
                      </li>
                      <li className="blog-page__social-item">
                        <a
                          href="#"
                          rel=""
                          target="_blank"
                          className="blog-page__social-link"
                        >
                          <Youtube className="blog-page__social-link-icon" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  {blog && (
                    <>
                      <BlogComments blogId={blog.id} commentsLimit={2} />
                      <BlogCommentForm onSubmit={() => {}} />
                    </>
                  )}
                </>
              )}
            </Loading>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Blog;
