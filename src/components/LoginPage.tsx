import { UserInfo, LoginError, LoginInfo } from "../vite-env";
import { useState, useEffect, FormEvent } from "react";
import { vertifyLogin } from "../helper/fetchHelper";
import whatsEat from "../assets/icons/whatsEat-icon.png";

interface LoginPageProps {
  setCurrentUser: (UserInfo: UserInfo) => void;
  setView: (view: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setView, setCurrentUser }) => {
  const [submitState, setSubmitState] = useState<LoginError>({
    submitted: false,
    loginSuccessful: false,
  });

  const vertifyHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentLoginInfo: LoginInfo = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    try {
      const result: UserInfo = await vertifyLogin(currentLoginInfo);
      console.log(result);
      setCurrentUser(result);
      setSubmitState({
        submitted: true,
        loginSuccessful: true,
      });
      await setTimeout(() => {
        setView("home");
      }, 3000);
    } catch (error) {
      setSubmitState({ submitted: true, loginSuccessful: false });
      console.error(error);
    }
  };

  const handleSignInAsGuest = () => {
    const guestUser = {
      userId: 0,
      email: "",
      userName: "guest",
    };
    setCurrentUser(guestUser);
    setView("home");
  };

  return (
    <>
      {/* container for Title and login form sections */}
      <section className='l-content-container'>
        {/* left side of login-container: Title + small description */}
        <header className='login-signup-title'>
          <div className='icon-title'>
            <img className='whatseat-icon' src={whatsEat} />
            <h1>WhatsEat</h1>
          </div>
          <p>
            Hungry but can't decide? <br />
            We've got you!
          </p>
        </header>
        {/* right side of login-container: Form for input feild login credentials */}
        <form
          className='login-signup-form'
          onSubmit={(e) => {
            vertifyHandler(e);
          }}
        >
          <h1>Login</h1>
          <label htmlFor=''>Email: </label>
          <input type='email' id='email' placeholder='Email' />

          <label htmlFor=''>Password: </label>
          <input type='password' id='password' placeholder='Password' />
          <button className='login-signup-btn' type='submit'>
            login
          </button>
          <small
            className='cursor-pointer login-signup-link'
            onClick={() => setView("createaccount")}
          >
            No Account? Sign up today!
          </small>
          <small>or</small>
          <small
            className='cursor-point login-signup-link'
            onClick={() => handleSignInAsGuest()}
          >
            Sign in as guest
          </small>
          <div>
            {submitState.submitted === true &&
              submitState.loginSuccessful === false && (
                <span className='error-submit'>Log In Failed</span>
              )}
            {submitState.submitted === true &&
              submitState.loginSuccessful === true && (
                <span className='success-submit'>Log In Success</span>
              )}
          </div>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
