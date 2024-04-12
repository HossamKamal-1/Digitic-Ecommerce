import { AlertCircle, Home, Mail, PhoneCall } from 'lucide-react';
import './ContactPage.scss';
import { FormEvent } from 'react';
function ContactPage() {
  function handleContactFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: implement sending email functionality
  }
  return (
    <main className="contact-page">
      <div className="container">
        <div className="contact-page__map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.957922399042!2d72.8614177154044!3d21.233517086131485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f2652963ac9%3A0x7d9787a5b5c4275d!2sSilver%20Business%20Point!5e0!3m2!1sen!2sin!4v1643268237161!5m2!1sen!2sin"
            width="100%"
            height="600"
            loading="lazy"
          />
        </div>
        <div className="contact-page__contact-details-wrapper">
          <div className="contact-page__contact-form-wrapper">
            <h3 className="contact-page__heading">Contact</h3>
            <form
              className="contact-page__contact-form"
              onSubmit={handleContactFormSubmit}
            >
              <div className="contact-page__input-group">
                <input
                  type="text"
                  placeholder=""
                  className="contact-page__input-field"
                />
                <label className="contact-page__input-placeholder">Name</label>
              </div>
              <div className="contact-page__input-group">
                <input
                  type="text"
                  placeholder=""
                  className="contact-page__input-field"
                />
                <label className="contact-page__input-placeholder">
                  Email *
                </label>
              </div>
              <div className="contact-page__input-group">
                <input
                  type="text"
                  placeholder=""
                  className="contact-page__input-field"
                />
                <label className="contact-page__input-placeholder">
                  Phone number
                </label>
              </div>
              <div className="contact-page__input-group">
                <textarea className="contact-page__comment-text-area" />
                <label className="contact-page__input-placeholder">
                  Comment
                </label>
              </div>
              <button className="contact-page__contact-btn">Send</button>
            </form>
          </div>
          {/* --- */}
          <div className="contact-page__info-wrapper">
            <h3 className="contact-page__heading">Get In Touch With Us</h3>
            <address className="contact-page__address">
              <div className="contact-page__row-wrapper">
                <Home className="contact-page__info-icon" />
                33 New Montgomery St. Ste 750 San Francisco, CA, USA 94105
              </div>
              <div className="contact-page__row-wrapper">
                <PhoneCall className="contact-page__info-icon" />
                (+91)7-723-4608
              </div>
              <div className="contact-page__row-wrapper">
                <Mail className="contact-page__info-icon" />
                <a
                  href="mailto:demo@company.com"
                  className="contact-page__email-link"
                >
                  demo@company.com
                </a>
              </div>
              <div className="contact-page__row-wrapper">
                <AlertCircle className="contact-page__info-icon" />
                Monday – Friday 10 AM – 8 PM
              </div>
            </address>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContactPage;
