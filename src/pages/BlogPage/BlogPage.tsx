import './BlogPage.scss';
import { Loading, formatDate } from '../../utils';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Facebook, Twitter, Youtube } from 'lucide-react';
import useBlog from '../../hooks/useBlog';
import BlogComments from './BlogComments';
import BlogCommentForm from './BlogCommentForm';
import { NavigationBox } from '../../components';
function BlogPage() {
  const { id } = useParams();
  const { blog, error, isFetching } = useBlog(id);
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
              isFetching={isFetching}
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
                      {formatDate(blog.date)}
                    </span>
                    <div className="divider" />
                    <span className="blog-page__author">
                      {blog.author.name}
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
                  {id && (
                    <>
                      <BlogComments blogId={+id} commentsLimit={5} />
                      <BlogCommentForm blogId={+id} />
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

export default BlogPage;
