"use client";

import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { authModalState } from "@/atoms/authModalAtom";
import { authOnClickState } from "@/atoms/authOnClickAtom";
import RedditInput from "@/components/ui/customUI/InputField";
import { emailValidator } from "@/lib/zodValidators/zodAuth";
import { useSignUpService } from "@/firebaseServices/authService";
import { FIREBASE_ERRORS } from "@/firebase/errors";

const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [value, setValue] = useState(""); // InputValue
  const [isFocused, setIsFocused] = useState<boolean>(false); // Focus
  const [clickState, setClickState] = useRecoilState(authOnClickState);
  const [error, setError] = useState<boolean>(false); // error
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // errorMessage
  const [borderColor, setBorderColor] = useState<string>("border-transparent");
  const { signUp, userCred, loading, userErrorMessage } = useSignUpService();
  const { emailValidatorMessage, validateEmail } = emailValidator();

  // FocusOn
  const handleFocus = () => {
    setIsFocused(true);
    setBorderColor("border-blue-500");
    setErrorMessage(null); // Clear error if valid
    setError(false);
  };

  // FocusOff
  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      setErrorMessage(null);
    }
    setBorderColor("border-transparent");

    if (value !== "") {
      ErrorCheck();
    }
  };

  // Triggers Input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim(); // Get the current value from input
    setValue(newValue); // Update state
    validateEmail(newValue)
      ? setClickState({ disable: false })
      : setClickState({ disable: true });
  };

  // Error Check
  const ErrorCheck = () => {
    try {
      if (validateEmail(value)) {
        setErrorMessage(null); // Clear error if valid
        setError(false);
      }
    } catch (error) {
      setErrorMessage(emailValidatorMessage); // Set the validation error message
      setBorderColor("border-red-500");
      setError(true);
    }
  };

  // onSubmit
  const handleSubmit = () => {
    if (validateEmail(value)) {
      signUp({ email: value });
      setClickState({ disable: true });
      //TODO: Check if same email Exist
      setAuthModalState((prev) => ({
        ...prev,
        view: "createUserPassword",
      }));
    }
  };

  useEffect(() => {
    // Reset state to the defaultState on component mount
    setValue("");
    setIsFocused(false);
    setBorderColor("border-transparent");
    setErrorMessage(null); // Reset error on mount
  }, []);

  // onSubmit
  useEffect(() => {
    if (clickState.clickedOn === "signup") {
      setClickState({ clickedOn: undefined });
      handleSubmit();
    }
  }, [clickState]);

  return (
    <>
      {/* TODO: Use Form */}
      <div className="grid">
        <div
          className={`relative h-[2.9rem] w-72 rounded-2xl border-2 bg-gray-200 transition-all duration-300 hover:bg-gray-300 ${borderColor}`}
        >
          <span
            className={`pointer-events-none absolute border-transparent transition-all duration-300 ${
              isFocused || value
                ? "left-3 top-2 text-[12px]"
                : "left-3 top-1/2 -translate-y-1/2 text-xs"
            }`}
          >
            <span className="text-gray-600">Email</span>
            <span className="ml-1 text-red-500">*</span>
          </span>
          <RedditInput
            className={`${isFocused ? "" : "pb-3"}`}
            id="userEmail"
            required
            type="email"
            value={value} // Provides Input Value
            onChange={handleChange} // Triggers when input changes
            onFocus={handleFocus} // FocusOn
            onBlur={handleBlur} // FocusOff
            disabled={loading} // disable when user is loading
          />
        </div>
        <div className="mx-3 flex h-[1rem] w-64">
          {
            errorMessage && (
              <div className="text-xs text-red-500">{errorMessage}</div>
            ) /* ||
            FIREBASE_ERRORS[
              userErrorMessage?.message as keyof typeof FIREBASE_ERRORS
            ] */
          }
        </div>

        <div className="mb-[108px] mt-[0.25rem] flex space-x-1 text-xs tracking-tight">
          <div>Already a redditor?</div>
          <div
            className="text-blue-600 hover:cursor-pointer hover:text-blue-400"
            onClick={() => {
              setAuthModalState((prev) => ({
                ...prev,
                view: "login",
              }));
            }}
          >
            Log In
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
