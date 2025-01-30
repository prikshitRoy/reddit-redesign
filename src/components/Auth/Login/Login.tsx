"use client";

import { useRecoilState } from "recoil";
import { useCallback, useEffect, useState } from "react";
import { authOnClickState } from "@/atoms/authOnClickAtom";
import { useLoginService } from "@/firebaseServices/authService";
import ResetOrNewUser from "@/components/Auth/Login/ResetOrNewUser";
import RedditEmailPasswordInput from "@/components/ui/customUI/RedditEmailPasswordInput";
import { FIREBASE_ERRORS } from "@/firebase/errors";

const EMAIL_OR_USERNAME_ID = "EmailOrUsername";
const PASSWORD_ID = "password";

type InputField = {
  label: string;
  type: string;
  id: string;
};

type InputStateType = {
  value: string;
};

type InputState = {
  [key: string]: InputStateType;
};

const userLogin: InputField[] = [
  { label: "Email or username", type: "text", id: EMAIL_OR_USERNAME_ID },
  { label: "Password", type: "password", id: PASSWORD_ID },
];
const Login: React.FC = () => {
  // Recoil: Login Click State
  const [clickState, setClickState] = useRecoilState(authOnClickState);

  // Error
  const [LoginError, setLoginError] = useState<boolean>(false);

  // Firebase Login Hook
  const { logIn, user, loading, error } = useLoginService();

  // Default InputState
  const defaultState: InputState = userLogin.reduce((acc, { id }) => {
    acc[id] = { value: "" };
    return acc;
  }, {} as InputState);

  // Input State
  const [inputState, setInputState] = useState<InputState>(defaultState);

  // OnInputChange
  const handleChange = useCallback((id: string, value: string) => {
    setInputState((prev) => ({
      ...prev,
      [id]: { ...prev[id], value },
    }));
  }, []);

  // Handle Submit
  const handleSubmit = () => {
    logIn({
      email: inputState[EMAIL_OR_USERNAME_ID].value,
      password: inputState[PASSWORD_ID].value,
    });
  };

  //! Runs Handle Submit
  useEffect(() => {
    if (clickState.clickedOn === "login") {
      setClickState({ clickedOn: undefined, disable: true });
      handleSubmit();
    }
  }, [clickState]);

  //! Set Error True
  useEffect(() => {
    if (error?.message != "") {
      setLoginError(true);
    }
  }, [error?.message]);

  //! Set Error False
  useEffect(() => {
    setLoginError(false);
  }, [inputState[EMAIL_OR_USERNAME_ID].value, inputState[PASSWORD_ID].value]);

  //! Sets Login Button visiable if both inputs are not empty
  useEffect(() => {
    if (
      inputState[EMAIL_OR_USERNAME_ID].value &&
      inputState[PASSWORD_ID].value
    ) {
      setClickState({ disable: false });
    }
  }, [inputState]);

  //! Reset state to defaultState on component mount
  useEffect(() => {
    setInputState(defaultState);
    // Login Button state
    setClickState({ clickedOn: undefined, disable: true });
  }, []);

  //TODO: Use Form
  //TODO: Zod
  return (
    <>
      {/* Email or UserName */}
      <RedditEmailPasswordInput
        type="text"
        id={EMAIL_OR_USERNAME_ID}
        onChange={(e) => handleChange(EMAIL_OR_USERNAME_ID, e.target.value)}
        value={inputState[EMAIL_OR_USERNAME_ID].value}
        //Reddit Email password Input props values
        PlaceHolder="Email or username"
        setErrorByUser={LoginError}
      />

      {/* Password */}
      <RedditEmailPasswordInput
        className="mt-4"
        type="password"
        id={PASSWORD_ID}
        onChange={(e) => handleChange(PASSWORD_ID, e.target.value)}
        value={inputState[PASSWORD_ID].value}
        //Reddit Email password Input props values
        PlaceHolder="Password"
        setErrorByUser={LoginError}
      />

      <span className={`ml-3 mt-[2px] h-[15px] w-fit text-[13px] text-red-600`}>
        {LoginError &&
          FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
        {/* {error?.message} */}
      </span>

      {/* ResetPassword and NewUser Sign Up Button */}
      <ResetOrNewUser />
    </>
  );
};

export default Login;
