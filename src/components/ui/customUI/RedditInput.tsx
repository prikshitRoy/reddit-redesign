"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

interface InputProps {
  setErrorByUser: boolean;
  setBorderColorByUser?: string;

  //TODO: Future Work --> Cursor Position
  //setCursorPosition,
}

const RedditInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & InputProps
>(({ setErrorByUser, className, type, ...props }, ref) => {
  // Input Value
  const [inputValue, setInputValue] = useState<string>("");

  // TODO: Future Work --> Cursor Position
  // const [cursorPosition, setCursorPosition] = useState<number>(0);
  // const inputRef = useRef<HTMLInputElement>(null);

  // Focus
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Error: takes boolen
  const [error, setError] = useState<boolean>(false);

  // Border Color
  const [borderColor, setBorderColor] = useState<string>("border-transparent");

  // FocusOn
  const handleFocus = () => {
    setIsFocused(true);
    if (error) {
      setBorderColor("border-red-500");
    } else {
      setBorderColor("border-blue-500");
    }
  };

  // FocusOff
  const handleBlur = () => {
    if (!inputValue) {
      setIsFocused(false);
      setBorderColor("border-transparent");
    }
    if (inputValue && error) {
      setIsFocused(true);
      setBorderColor("border-red-500");
    }
  };

  // Triggers Input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // TODO: Future Work
    // setCursorPosition(e.target.selectionStart || 0);
  };

  // TODO: Future Work --> Handle Click
  // const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   if (inputRef.current) {
  //     inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
  //   }
  // };

  // TODO: Future Work --> Handle Key Up
  // const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   const input = e.target as HTMLInputElement;
  //   setCursorPosition(input.selectionStart || 0);
  // };

  // TODO: Future Work
  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
  //   }
  // }, [cursorPosition]);

  // Reset state
  useEffect(() => {
    setInputValue("");
    setIsFocused(false);
    // TODO: Future Work
    //setCursorPosition(0);
    setError(false);
    setBorderColor("border-transparent");
  }, []);

  useEffect(() => {
    if (setErrorByUser) {
      setError(true);
    }
    if (!setErrorByUser) {
      setError(false);
    }
  }, [setErrorByUser]);

  return (
    <>
      <div
        className={`relative h-[2.9rem] w-72 rounded-2xl border-2 bg-gray-200 transition-all duration-300 hover:bg-gray-300 ${borderColor}`}
      >
        <span
          className={`pointer-events-none absolute border-transparent transition-all duration-300 ${
            isFocused || inputValue
              ? "left-3 top-2 text-[12px]"
              : "left-3 top-1/2 -translate-y-1/2 text-xs"
          }`}
        >
          <span className="text-gray-600">Email</span>
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
          onChange={handleChange} // Triggers when input changes
          onFocus={handleFocus} // FocusOn
          onBlur={handleBlur} // FocusOff
        />
      </div>
    </>
  );
});
RedditInput.displayName = "Input";

export default RedditInput;
