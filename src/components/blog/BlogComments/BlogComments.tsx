import "./BlogComments.scss";
import { useState } from "react";
import { formatDate, pluralize } from "@utils";
import { Loading, RenderList } from "@components/common/utils";
import CustomPagination from "@components/common/ui/CustomPagination/CustomPagination";
import type { TComment } from "@custom-types/blog";
import { useGetBlogCommentsByIdQuery } from "@store/features/products/productsSlice";

type BlogCommentsProps = {
  blogId: number;
  commentsLimit: number;
};
function BlogComments({ blogId, commentsLimit }: BlogCommentsProps) {
  const {
    data: blogComments,
    isLoading,
    error,
  } = useGetBlogCommentsByIdQuery(blogId);
  const [commentsCurrentPage, setCommentsCurrentPage] = useState(1);

  const totalCommentsPages = blogComments
    ? Math.ceil(blogComments.length / commentsLimit)
    : 1;
  const commentsList = blogComments
    ? blogComments.slice(
        commentsLimit * (commentsCurrentPage - 1),
        commentsLimit * commentsCurrentPage
      )
    : [];

  return (
    <div className="blog-comments">
      <Loading
        isFetching={isLoading}
        error={error}
        renderLoader={<span>Loading</span>}
      >
        {blogComments && blogComments?.length > 0 && (
          <span className="blog-comments__comments-count">
            {`${blogComments.length} ${pluralize(
              blogComments.length,
              "comment",
              "comments"
            )}`}
          </span>
        )}
        {commentsList.length > 0 ? (
          <>
            <RenderList
              items={commentsList}
              renderItem={(comment) => (
                <BlogComment key={comment.id} comment={comment} />
              )}
            />
            <div className="blog-comments__comment-pagination-wrapper">
              <CustomPagination
                currentPage={commentsCurrentPage}
                totalPages={totalCommentsPages}
                setPageHandler={setCommentsCurrentPage}
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
type BlogCommentProps = {
  comment: TComment;
};
function BlogComment({ comment }: BlogCommentProps) {
  const commentCreatedDate = formatDate(comment.createdAt);
  return (
    <div className="blog-comments__comment-wrapper">
      <p className="blog-comments__comment-content">{comment.body}</p>
      <div className="blog-comments__comment-info-wrapper">
        <span className="blog-comments__comment-author">
          {comment.user.fullName}
        </span>
        <div className="divider--white" />
        <span className="blog-comments__comment-date">
          {commentCreatedDate}
        </span>
      </div>
    </div>
  );
}
export default BlogComments;
