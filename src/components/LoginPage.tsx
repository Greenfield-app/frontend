import { UserInfo, LoginError, LoginInfo } from "../vite-env";
import { useState, useEffect, FormEvent } from "react";
import { vertifyLogin } from "../helper/fetchHelper";
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
        setView("foodlist");
      }, 3000);
    } catch (error) {
      setSubmitState({ submitted: true, loginSuccessful: false });
      console.error(error);
    }
  };
  return (
    <>
      {/* container for Title and login form sections */}
      <section className="l-login-signup-container">
        {/* left side of login-container: Title + small description */}
        <header className="login-signup-title">
          <h1>WhatsEat</h1>
          <p>
            Hungry but can't decide? <br />
            We've got you!
          </p>
        </header>
        {/* right side of login-container: Form for input feild login credentials */}
        <form
          className="login-signup-form"
          onSubmit={(e) => {
            vertifyHandler(e);
          }}
        >
          <h1>Login</h1>
          <label htmlFor="">Emial: </label>
          <input type="email" id="email" placeholder="Email" />

          <label htmlFor="">Password: </label>
          <input type="password" id="password" placeholder="Password" />
          <button type="submit">Submit</button>
          <small
            className="cursor-pointer login-signup-link"
            onClick={() => setView("createaccount")}
          >
            No Account? Sign up today!
          </small>
          <div>
            {submitState.submitted === true &&
              submitState.loginSuccessful === false && (
                <span className="error-submit">Log In Failed</span>
              )}
            {submitState.submitted === true &&
              submitState.loginSuccessful === true && (
                <span className="success-submit">Log In Success</span>
              )}
          </div>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
