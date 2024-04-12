import { useState } from 'react';
import { Loading, formatDate, pluralize } from '../../utils';
import { BlogComment } from '../../components/BlogCard/BlogCard';
import { useAxios } from '../../hooks/useAxios';
import { CustomPagination } from '../../components';
import EcommerceClient from '../../services/ecommerceApi';
import './BlogComments.scss';
type BlogCommentsProps = {
  blogId: number;
  commentsLimit: number;
};
function BlogComments({ blogId, commentsLimit }: BlogCommentsProps) {
  const {
    responseData: comments,
    isFetching,
    error,
  } = useAxios<BlogComment[]>(
    {
      url: '/comments',
      params: {
        blogId,
      },
    },
    EcommerceClient
  );
  const [commentsCurrentPage, setCommentsCurrentPage] = useState(1);

  const totalCommentsPages = comments
    ? Math.ceil(comments.length / commentsLimit)
    : 1;
  const commentsList = comments
    ? comments.slice(
        commentsLimit * (commentsCurrentPage - 1),
        commentsLimit * commentsCurrentPage
      )
    : [];
  return (
    <div className="blog-comments">
      <Loading
        isFetching={isFetching}
        error={error}
        renderLoader={<span>Loading</span>}
      >
        {comments && comments.length > 0 && (
          <span className="blog-comments__comments-count">
            {`${comments.length} ${pluralize(
              comments.length,
              'comment',
              'comments'
            )}`}
          </span>
        )}
        {commentsList.length > 0 ? (
          <>
            {commentsList.map(({ author, body, createdAt, id }) => (
              <div className="blog-comments__comment-wrapper" key={id}>
                <p className="blog-comments__comment-content">{body}</p>
                <div className="blog-comments__comment-info-wrapper">
                  <span className="blog-comments__comment-author">
                    {author.name}
                  </span>
                  <div className="divider--white" />
                  <span className="blog-comments__comment-date">
                    {formatDate(createdAt)}
                  </span>
                </div>
              </div>
            ))}
            <div className="blog-comments__comment-pagination-wrapper">
              <CustomPagination
                currentPage={commentsCurrentPage}
                totalPages={totalCommentsPages}
                setPage={setCommentsCurrentPage}
              />
            </div>
          </>
        ) : (
          <span>There is no comments</span>
        )}
      </Loading>
    </div>
  );
}

export default BlogComments;
