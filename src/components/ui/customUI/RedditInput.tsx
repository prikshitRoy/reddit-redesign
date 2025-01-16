"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "../input";

interface InputProps {
  PlaceHolder: string;
  setErrorByUser: boolean;
  setonBlurByUser: boolean;
  setOnFocusByUser: boolean;
  setInputValueByUser: string;
  setBorderColorByUser?: string;
}

const RedditInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & InputProps
>(
  (
    {
      setBorderColorByUser,
      setInputValueByUser,
      setOnFocusByUser,
      setonBlurByUser,
      setErrorByUser,
      PlaceHolder,
      className,
      type,
      ...props
    },
    ref,
  ) => {
    // Input Value
    const [inputValue, setInputValue] = useState<string>("");

    // Focus
    const [isFocused, setIsFocused] = useState<boolean>(false);

    // Error: takes boolen
    const [error, setError] = useState<boolean>(false);

    // Border Color
    const [borderColor, setBorderColor] =
      useState<string>("border-transparent");

    // FocusOn
    const handleFocus = () => {
      setIsFocused(true);
      setBorderColor("border-blue-500");
    };

    // FocusOff
    const handleBlur = () => {
      if (inputValue && setErrorByUser) {
        setBorderColor("border-red-500");
      }
      if (!inputValue) {
        setIsFocused(false);
      }
      if (inputValue === "" && !setErrorByUser) {
        setBorderColor("border-transparent");
      }
      //
    };

    // Reset state
    useEffect(() => {
      setInputValue("");
      setIsFocused(false);
      setError(false);
      setBorderColor("border-transparent");
    }, []);

    useEffect(() => {
      // Error
      if (setErrorByUser) {
        console.log("UseSate Error", setErrorByUser);
        setError(true);
      } else {
        setError(false);
      }

      // InputValue
      if (setInputValueByUser != "") {
        setInputValue(setInputValueByUser!);
      }
      if (setInputValueByUser === "") {
        setInputValue("");
      }

      // OnFocused
      if (setOnFocusByUser) {
        handleFocus();
      }
      if (setonBlurByUser) {
        handleBlur();
      }
    }, [
      setErrorByUser,
      setInputValueByUser,
      setOnFocusByUser,
      setonBlurByUser,
    ]);

    useEffect(() => {
      setInputValue("");
      setIsFocused(false);
      setError(false);
      setBorderColor("border-transparent");
    }, []);

    return (
      <>
        <div
          className={`relative h-[2.9rem] w-full rounded-2xl border-2 bg-gray-200 transition-all duration-300 hover:bg-gray-300 ${borderColor}`}
        >
          <span
            className={`pointer-events-none absolute border-transparent transition-all duration-300 ${
              isFocused || inputValue
                ? "left-3 top-2 text-[12px]"
                : "left-3 top-1/2 -translate-y-1/2 text-xs"
            }`}
          >
            <span className="text-gray-600">
              {PlaceHolder ? `${PlaceHolder}` : "Enter Place Holder"}
            </span>
            <span className="ml-1 text-red-500">*</span>
          </span>
          <input
            ref={ref}
            {...props}
            type={type}
            className={cn(
              `h-full w-full cursor-pointer rounded-2xl border-transparent bg-transparent px-[15px] pt-3 text-[16px] outline-none hover:bg-transparent ${isFocused ? "" : "pb-3"}`,
              className,
            )}
            value={inputValue} // Provides Input Value
            // onChange={handleChange} // Triggers when input changes
            //onFocus={handleFocus} // FocusOn
            //onBlur={handleBlur} // FocusOff
          />
        </div>
      </>
    );
  },
);
RedditInput.displayName = "Input";

export default RedditInput;
