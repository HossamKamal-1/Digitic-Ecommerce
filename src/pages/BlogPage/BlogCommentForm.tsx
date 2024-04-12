import { ElementRef, FormEvent, useRef } from 'react';
import { BlogComment } from '../../components/BlogCard/BlogCard';
import EcommerceClient from '../../services/ecommerceApi';
import './BlogCommentForm.scss';
type BlogCommentFormProps = {
  blogId: number;
};

function BlogCommentForm({ blogId }: BlogCommentFormProps) {
  const nameInputRef = useRef<ElementRef<'input'>>(null);
  const emailInputRef = useRef<ElementRef<'input'>>(null);
  const commentInputRef = useRef<ElementRef<'textarea'>>(null);
  async function handleCommentFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !nameInputRef.current ||
      !emailInputRef.current ||
      !commentInputRef.current
    )
      return;
    // TODO: make the author from registeration
    // TODO: commentability is only if you are registered
    const blogComment: Omit<BlogComment, 'id'> = {
      blogId,
      author: {
        id: 12,
        name: nameInputRef.current.value,
      },
      body: commentInputRef.current.value,
      createdAt: new Date(),
    };
    try {
      const { data } = await EcommerceClient.post('comments', blogComment);
      // FIXME: try to fetch comments independent of the blog details
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="blog-form-content">
      <h3 className="blog-form-content__create-comment-label">
        Leave A Comment
      </h3>
      <form
        className="blog-form-content__create-comment-form"
        onSubmit={handleCommentFormSubmit}
      >
        <div className="blog-form-content__comment-user-info-wrapper">
          <div className="blog-form-content__form-group">
            <input
              type="text"
              className="blog-form-content__form-input"
              placeholder=""
              ref={nameInputRef}
            />
            <label className="blog-form-content__placeholder">Name *</label>
          </div>
          <div className="blog-form-content__form-group">
            <input
              type="text"
              className="blog-form-content__form-input"
              placeholder=""
              ref={emailInputRef}
            />
            <label className="blog-form-content__placeholder">Email *</label>
          </div>
        </div>
        <div className="blog-form-content__form-group">
          <textarea
            className="blog-form-content__comment-text-area"
            placeholder=""
            ref={commentInputRef}
          />
          <label className="blog-form-content__placeholder">Comment *</label>
        </div>
        <button type="submit" className="blog-form-content__submit-comment-btn">
          Post Comment
        </button>
      </form>
    </div>
  );
}

export default BlogCommentForm;
