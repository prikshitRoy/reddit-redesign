"use client";

import { cn } from "@/lib/utils";
import { useMergeRefs } from "use-callback-ref";
import React, { useState, useEffect, useRef } from "react";

interface RedditTextAreaProps {
  TextAreaPlaceHolder?: string;
  TextAreasetErrorByUser: boolean;
  TextAreasetonBlurByUser: boolean;
  TextAreasetOnFocusByUser: boolean;
  TextAreasetInputValueByUser: string;
  TextAreasetBorderColorByUser?: string;
}

const RedditTextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & RedditTextAreaProps
>(
  (
    {
      TextAreasetBorderColorByUser,
      TextAreasetInputValueByUser,
      TextAreasetOnFocusByUser,
      TextAreasetonBlurByUser,
      TextAreasetErrorByUser,
      TextAreaPlaceHolder,
      className,
      ...props
    },
    ref,
  ) => {
    // Focus cursor on Inputfield
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Input Value
    const [inputValue, setInputValue] = useState<string>("");

    // Focus: Usign to Place Holder & Inputbox movement
    const [isFocused, setIsFocused] = useState<boolean>(false);

    // Border Color
    const [borderColor, setBorderColor] =
      useState<string>("border-transparent");

    // OnFocus
    const handleFocus = () => {
      inputRef.current?.focus();
      setIsFocused(true);

      setBorderColor("border-blue-500");
    };

    // OffFocus
    const handleBlur = () => {
      if (inputValue && TextAreasetErrorByUser) {
        setBorderColor("border-red-500");
        setIsFocused(true);
      }
      if (inputValue && !TextAreasetErrorByUser) {
        setBorderColor("border-transparent");
        setIsFocused(true);
      }

      if (inputValue === "" && !TextAreasetErrorByUser) {
        setBorderColor("border-transparent");
        setIsFocused(false);
      }
    };

    // Reset state
    useEffect(() => {
      setInputValue("");
      setIsFocused(false);
      setBorderColor("border-transparent");
    }, []);

    useEffect(() => {
      // InputValue
      if (TextAreasetInputValueByUser != "") {
        setInputValue(TextAreasetInputValueByUser!);
      }
      if (TextAreasetInputValueByUser === "") {
        setInputValue("");
      }

      // OnFocused
      if (TextAreasetOnFocusByUser) {
        handleFocus();
      }
      if (TextAreasetonBlurByUser) {
        handleBlur();
      }
    }, [
      TextAreasetErrorByUser,
      TextAreasetInputValueByUser,
      TextAreasetOnFocusByUser,
      TextAreasetonBlurByUser,
    ]);

    // Reset
    useEffect(() => {
      setInputValue("");
      setIsFocused(false);
      setBorderColor("border-transparent");
    }, []);

    return (
      <>
        <div
          className={`group relative min-h-full w-full flex-grow rounded-2xl border-2 bg-gray-200 hover:bg-gray-300 ${borderColor}`}
          onClick={handleFocus}
        >
          <span
            className={`pointer-events-none absolute left-3 border-transparent transition-all duration-300 ${
              isFocused || inputValue
                ? "top-2 text-[12px]"
                : "top-5 -translate-y-1/2 text-xs"
            }`}
          >
            <span className="text-gray-600">
              {TextAreaPlaceHolder
                ? `${TextAreaPlaceHolder}`
                : "Enter Place Holder"}
            </span>
            <span className="ml-1 text-red-500">*</span>
          </span>
          <textarea
            ref={useMergeRefs([ref, inputRef])}
            {...props}
            className={cn(
              `absolute h-full max-h-[calc(100%-2rem)] w-full max-w-[calc(100%-1rem)] resize-none border border-transparent bg-transparent px-3 py-2 text-base outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                isFocused ? "bottom-2" : "top-1/2 -translate-y-1/2"
              } `,
              className,
            )}
            // Provides Input Value
            //onFocus={handleFocus} // FocusOn
            //onBlur={handleBlur} // onBlur
          />
        </div>
      </>
    );
  },
);
RedditTextArea.displayName = "textarea";

export default RedditTextArea;
