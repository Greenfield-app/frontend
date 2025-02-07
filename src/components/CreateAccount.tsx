import "../styles/modules/createaccount.css";
import { registerInfo } from "../vite-env";
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
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    console.log(newRegisterInfo);
  }, [newRegisterInfo]);
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await sendRegisterInfo(newRegisterInfo);
      console.log(result);
      if (result) {
        changeView("foodlist");
      }
    } catch (error) {
      setError(true);
      console.error(error);
      //TODO: inform user error
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const currentElementId = e.currentTarget.id;
    const currentElementValue = e.currentTarget.value;
    switch (currentElementId) {
      case "username":
        setNewRegisterInfo({
          ...newRegisterInfo,
          userName: currentElementValue,
        });
        break;
      case "password":
        console.log(e.currentTarget);
        setNewRegisterInfo({
          ...newRegisterInfo,
          password: currentElementValue,
        });
        break;
      case "password-confirm":
        setNewRegisterInfo({
          ...newRegisterInfo,
          confirmPassword: currentElementValue,
        });
        break;
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
        <input type="text" id="username" onChange={(e) => changeHandler(e)} />
        <label htmlFor="">Password: </label>
        <input type="text" id="password" onChange={(e) => changeHandler(e)} />
        <label htmlFor="">Confirm Password: </label>
        <input
          type="text"
          id="password-confirm"
          onChange={(e) => changeHandler(e)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>{error ? <></> : <div>Registeration Failed!</div>}</div>
    </div>
  );
};

export default CreateAccount;
