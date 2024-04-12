import './NewsLetter.scss';
import { FormEvent } from 'react';
import newsLetterImg from '../../assets/images/newsletter.png';
function NewsLetter() {
  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: News Letter form handling
  }
  return (
    <div className="newsletter">
      <div className="newsletter-desc">
        <img src={newsLetterImg} alt="news letter" />
        <h2 className="text">Sign Up For NewsLetter</h2>
      </div>
      <form className="newsletter-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <div className="newsletter-input-wrapper">
            <input
              type="text"
              className="newsletter-input"
              placeholder=""
              id="newsLetter"
            />
            <label htmlFor="newsLetter">Your Email</label>
          </div>
          <button>SUBSCRIBE</button>
        </div>
      </form>
    </div>
  );
}

export default NewsLetter;
