import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.scss';
function Login() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(
    () => hash === '#forgetpassword'
  );

  function handleLoginClick(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: implement login functionality
  }
  function handleForgetPasswordSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: implement forget password functionality
  }
  function handleForgetPasswordPageVisibility(visible: boolean) {
    setShowForgetPasswordForm(visible);
    navigate(visible ? '#forgetpassword' : '');
  }
  return (
    <main className="login-page">
      <div className="login-page__form-box">
        <div className="login-page__form-outer-wrapper">
          <div
            className={`login-page__form-inner-wrapper ${
              showForgetPasswordForm ? 'forget' : ''
            }`}
          >
            <div className="login-page__login-form-content">
              <h5 className="login-page__form-heading">Login</h5>
              <form
                onSubmit={handleLoginClick}
                className="login-page__login-form"
              >
                <div className="login-page__input-group">
                  <input
                    type="text"
                    placeholder=""
                    className="login-page__input-field"
                  />
                  <label className="login-page__input-placeholder">Email</label>
                </div>
                <div className="login-page__input-group">
                  <input
                    type="password"
                    placeholder=""
                    className="login-page__input-field"
                  />
                  <label className="login-page__input-placeholder">
                    Password
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => handleForgetPasswordPageVisibility(true)}
                  className="login-page__forget-password-btn"
                >
                  Forget your password?
                </button>
                <div className="login-page__login-form-actions-wrapper">
                  <button className="login-page__login-form-btn">Login</button>
                  <Link
                    to="/register"
                    className="login-page__login-form-btn login-page__login-form-btn--register"
                  >
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
            <div className="login-page__forget-form-content">
              <h4 className="login-page__form-heading">Reset Your Password</h4>
              <p className="login-page__reset-pw-desc">
                we will send you an email to reset your password
              </p>
              <form onSubmit={handleForgetPasswordSubmit}>
                <div className="login-page__input-group">
                  <input
                    type="email"
                    className="login-page__input-field"
                    placeholder=""
                  />
                  <label className="login-page__input-placeholder">Email</label>
                </div>
                <div className="login-page__forget-password-actions-wrapper">
                  <button className="login-page__login-form-btn">Submit</button>
                  <button
                    className="login-page__cancel-forget-btn"
                    type="button"
                    onClick={() => handleForgetPasswordPageVisibility(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
