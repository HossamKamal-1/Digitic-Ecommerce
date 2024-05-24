import { FormEvent } from 'react';
import './Register.scss';
function Register() {
  function handleRegisterClick(e: FormEvent<HTMLFormElement>) {
    // TODO: handle register request and validation logic
    e.preventDefault();
  }
  return (
    <main className="register-page">
      <div className="register-page__form-box">
        <div className="register-page__register-form-content">
          <h5 className="register-page__form-heading">Create Account</h5>
          <form
            onSubmit={handleRegisterClick}
            className="register-page__register-form"
          >
            <div className="register-page__input-group">
              <input
                type="text"
                placeholder=""
                className="register-page__input-field"
              />
              <label className="register-page__input-placeholder">
                First name
              </label>
            </div>
            <div className="register-page__input-group">
              <input
                type="text"
                placeholder=""
                className="register-page__input-field"
              />
              <label className="register-page__input-placeholder">
                Last name
              </label>
            </div>
            <div className="register-page__input-group">
              <input
                type="text"
                placeholder=""
                className="register-page__input-field"
              />
              <label className="register-page__input-placeholder">Email</label>
            </div>
            <div className="register-page__input-group">
              <input
                type="password"
                placeholder=""
                className="register-page__input-field"
              />
              <label className="register-page__input-placeholder">
                Password
              </label>
            </div>
            <button className="register-page__register-form-btn">Create</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Register;
