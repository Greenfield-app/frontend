import { RegisterInfo, RegisterError } from "../vite-env";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { sendRegisterInfo } from "../helper/fetchHelper";
import { validateEmail } from "../helper/validateEmali";
interface CreateAccountProps {
  newRegisterInfo: RegisterInfo;
  setNewRegisterInfo: (registerInfo: RegisterInfo) => void;
  setView: (view: string) => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({
  newRegisterInfo,
  setNewRegisterInfo,
  setView,
}) => {
  useEffect(() => {
    validateInput();
    console.log(newRegisterInfo);
  }, [newRegisterInfo]);

  const [error, setError] = useState<RegisterError>({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [submitError, setSubmitError] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await sendRegisterInfo(newRegisterInfo);
      console.log(result);
      if (result) {
        setSubmitSuccess(true);
        await setTimeout(() => {
          setView("foodlist");
        }, 3000);
      }
    } catch (error) {
      setSubmitError(true);
      console.error(error);
    }
  };

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const currentElementId = e.currentTarget.id;
    const currentElementValue = e.currentTarget.value;
    switch (currentElementId) {
      case "username":
        await setNewRegisterInfo({
          ...newRegisterInfo,
          userName: currentElementValue,
        });
        break;
      case "email":
        await setNewRegisterInfo({
          ...newRegisterInfo,
          email: currentElementValue,
        });
        break;
      case "password":
        console.log(e.currentTarget);
        await setNewRegisterInfo({
          ...newRegisterInfo,
          password: currentElementValue,
        });
        break;
      case "password-confirm":
        await setNewRegisterInfo({
          ...newRegisterInfo,
          confirmPassword: currentElementValue,
        });
        break;
    }
    console.log(error);
  };

  const validateInput = () => {
    if (newRegisterInfo.userName.length < 3) {
      setError((prev) => ({ ...prev, ["userName"]: true }));
    } else {
      setError((prev) => ({ ...prev, ["userName"]: false }));
    }
    if (validateEmail(newRegisterInfo.email) === false) {
      setError((prev) => ({ ...prev, ["email"]: true }));
    } else {
      setError((prev) => ({ ...prev, ["email"]: false }));
    }
    if (newRegisterInfo.password.length < 6) {
      setError((prev) => ({ ...prev, ["password"]: true }));
    } else {
      setError((prev) => ({ ...prev, ["password"]: false }));
    }
    if (newRegisterInfo.confirmPassword !== newRegisterInfo.password) {
      setError((prev) => ({ ...prev, ["confirmPassword"]: true }));
    } else {
      setError((prev) => ({ ...prev, ["confirmPassword"]: false }));
    }
  };

  return (
    <section className="l-login-signup-container">
      {/* title side */}
      <header className="login-signup-title">
        <h1>WhatsEat</h1>
        <p>
          Hungry but can't decide? <br />
          We've got you!
        </p>
      </header>

      {/* signup side */}
      <form
        className="login-signup-form"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <h1>Create Account</h1>
        <label htmlFor="">Username: </label>
        <input
          type="text"
          id="username"
          onChange={(e) => changeHandler(e)}
          placeholder="UserName"
        />
        {error.userName && (
          <span className="error-signin">
            Username must be at least 3 characters
          </span>
        )}

        <label htmlFor="">Emial: </label>
        <input
          type="email"
          id="email"
          onChange={(e) => changeHandler(e)}
          placeholder="Email"
        />
        {error.email && (
          <span className="error-signin">Not valid email address</span>
        )}

        <label htmlFor="">Password: </label>
        <input
          type="password"
          id="password"
          onChange={(e) => changeHandler(e)}
          placeholder="Password"
        />
        {error.password && (
          <span className="error-signin">
            Password must be at least 6 characters
          </span>
        )}
        <label htmlFor="">Confirm Password: </label>
        <input
          type="password"
          id="password-confirm"
          onChange={(e) => changeHandler(e)}
          placeholder="Confirm Password"
        />
        {error.confirmPassword && (
          <span className="error-register">Passwords do not match</span>
        )}
        <button type="submit">Submit</button>

        <small
          className="cursor-pointer login-signup-link"
          onClick={() => setView("login")}
        >
          Have an account? Sign in today!
        </small>
        <div>
          {submitError && <span className="error-submit">Sign Up Failed</span>}
          {submitSuccess && (
            <span className="success-submit">Sign Up Success</span>
          )}
        </div>
      </form>
    </section>
  );
};

export default CreateAccount;
