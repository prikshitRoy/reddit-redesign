"use client";

import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { authOnClickState } from "@/atoms/authOnClickAtom";
import RedditInput from "@/components/ui/customUI/InputField";
import { useLoginService } from "@/firebaseServices/authService";
import ResetOrNewUser from "@/components/Auth/Login/ResetOrNewUser";

type InputStateType = {
  isFocused: boolean;
  value: string;
  borderColor: string;
};

type InputState = {
  [key: string]: InputStateType;
};

const userLogin = [
  { label: "Email or username", type: "text", id: "EmailOrUsername" },
  { label: "Password", type: "password", id: "password" },
];

const Login: React.FC = () => {
  const [clickState, setClickState] = useRecoilState(authOnClickState);
  const { logIn, user, loading, error } = useLoginService();

  // Default inputState
  const defaultState: InputState = userLogin.reduce((acc, field) => {
    acc[field.id] = {
      isFocused: false,
      value: "",
      borderColor: "border-transparent",
    };
    return acc;
  }, {} as InputState);

  // Input State
  const [inputState, setInputState] = useState<InputState>(defaultState);

  // Focus On
  const handleClick = (id: string) => {
    setInputState((prev) => ({
      ...prev,
      [id]: { ...prev[id], isFocused: true, borderColor: "border-blue-500" },
    }));
  };

  //Focus Off
  const handleBlur = (id: string) => {
    setInputState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isFocused: false,
        borderColor: "border-transparent",
      },
    }));
  };

  // OnInputChange
  const handleChange = (id: string, value: string) => {
    setInputState((prev) => ({
      ...prev,
      [id]: { ...prev[id], value },
    }));

    console.log(id, ":", value);
  };

  // Reset state to the defaultState on component mount
  useEffect(() => {
    setInputState(defaultState);
  }, []);

  useEffect(() => {
    if (inputState.EmailOrUsername.value && inputState.password.value) {
      setClickState({ disable: false });
    }
  }, [inputState]);

  // onSubmit
  const handleSubmit = async () => {
    logIn({
      email: inputState.EmailOrUsername.value,
      password: inputState.password.value,
    });
  };

  // onSubmit
  useEffect(() => {
    if (clickState.clickedOn === "login") {
      setClickState({ clickedOn: undefined, disable: true });
      handleSubmit();
    }
  }, [clickState]);

  return (
    <>
      <div className="grid gap-4">
        {userLogin.map((user) => (
          <div
            key={user.id}
            className={`relative h-[2.9rem] w-72 rounded-2xl border-2 bg-gray-200 transition-all duration-300 hover:bg-gray-300 ${inputState[user.id].borderColor}`}
          >
            <span
              className={`pointer-events-none absolute border-transparent transition-all duration-300 ${
                inputState[user.id].isFocused || inputState[user.id].value
                  ? "left-3 top-2 text-[11px]"
                  : "left-3 top-1/2 -translate-y-1/2 text-xs"
              }`}
            >
              <span className="text-gray-600">{user.label}</span>
              <span className="ml-1 text-red-500">*</span>
            </span>
            <RedditInput
              id={user.id}
              required
              type={user.type}
              onFocus={() => handleClick(user.id)}
              onBlur={() => handleBlur(user.id)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(user.id, e.target.value)
              }
              value={inputState[user.id].value}
            />
          </div>
        ))}
      </div>

      {/* ResetPassword and NewUser Sign Up Button */}
      <ResetOrNewUser />
    </>
  );
};

export default Login;
