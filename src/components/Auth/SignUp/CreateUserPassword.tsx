"use client";

import { useEffect, useState } from "react";
import RedditInput from "@/components/ui/customUI/InputField";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authOnClickState } from "@/atoms/authOnClickAtom";
import { useSignUpService } from "@/services/authService";
import { authModalState } from "@/atoms/authModalAtom";

type InputStateType = {
  isFocused: boolean;
  value: string;
  borderColor: string;
};

type InputState = {
  [key: string]: InputStateType;
};

const userLogin = [
  { label: "Username", type: "text", id: "Username" },
  { label: "Password", type: "password", id: "password" },
];

const CreateUserPassword: React.FC = () => {
  const [clickState, setClickState] = useRecoilState(authOnClickState);
  const { signUp, userCred, loading, userError } = useSignUpService();
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

  useEffect(() => {
    // Reset state to the defaultState on component mount
    setInputState(defaultState);
  }, []);

  // onSubmit
  const handleSubmit = async () => {
    signUp({
      userName: inputState.Username.value,
      password: inputState.password.value,
    });
  };

  // onSubmit
  useEffect(() => {
    if (clickState.clickedOn === "createUserPassword") {
      setClickState({ clickedOn: undefined, disable: true });
      handleSubmit();
    }
  }, [clickState]);

  return (
    <>
      <span className="w-72 pb-4 pt-1 text-xs tracking-tight">
        Reddit is anonymous, so your username is what you'll go by here. Choose
        wisely because once you get name, you can't change it.
      </span>
      <div className="mb-[10.1rem] grid gap-4">
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
    </>
  );
};

export default CreateUserPassword;
