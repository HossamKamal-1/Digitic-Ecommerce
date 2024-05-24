import "./NewsLetter.scss";
// REFACTOR: CSS
import { FormEvent } from "react";
import newsLetterImg from "@assets/images/newsletter.png";
function NewsLetter() {
  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // TODO: News Letter form handling
  }
  return (
    <section className="newsletter-section">
      <div className="newsletter-section__desc">
        <img src={newsLetterImg} className="newsletter-section__img" alt="news letter" />
        <h2 className="newsletter-section__heading">Sign Up For NewsLetter</h2>
      </div>
      <form className="newsletter-section__form" onSubmit={handleFormSubmit}>
        <div className="newsletter-section__form-group">
          <div className="newsletter-section__input-wrapper">
            <input
              type="text"
              className="newsletter-section__input"
              placeholder=""
              id="newsLetter"
            />
            <label htmlFor="newsLetter" className="newsletter-section__input-label">Your Email</label>
          </div>
          <button className="newsletter-section__submit-btn">SUBSCRIBE</button>
        </div>
      </form>
    </section>
  );
}

export default NewsLetter;
