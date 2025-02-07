import "../styles/modules/createaccount.css";
import { registerInfo, signupError } from "../vite-env";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { sendRegisterInfo } from "../helper/fetchHelper";
interface CreateAccountProps {
  newRegisterInfo: registerInfo;
  setNewRegisterInfo: (registerInfo: registerInfo) => void;
  changeView: (view: string) => void;
}
const CreateAccount: React.FC<CreateAccountProps> = ({
  newRegisterInfo,
  setNewRegisterInfo,
  changeView,
}) => {
  useEffect(() => {
    console.log(newRegisterInfo);
    validateInput();
  }, [newRegisterInfo]);
  const [error, setError] = useState<signupError>({
    userName: false,
    password: false,
    confirmPassword: false,
  });
  const [submitError, setSubmitError] = useState<boolean>(false);
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await sendRegisterInfo(newRegisterInfo);
      console.log(result);
      if (result) {
        changeView("foodlist");
      }
    } catch (error) {
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
    <div className="creataccount">
      <form
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
        <label htmlFor="">Password: </label>
        <input
          type="text"
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
          type="text"
          id="password-confirm"
          onChange={(e) => changeHandler(e)}
          placeholder="Confirm Password"
        />
        {error.confirmPassword && (
          <span className="error-signin">Passwords do not match</span>
        )}
        <button type="submit">Submit</button>
      </form>
      <div>{error ? <></> : <div>Registeration Failed!</div>}</div>
    </div>
  );
};

export default CreateAccount;
