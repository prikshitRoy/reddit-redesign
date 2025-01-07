"use client";

import { useState } from "react";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

function validateEmail(input: string) {
  const result = emailSchema.safeParse({ email: input });

  if (result.success) {
    return { isValid: true, errorMessage: null };
  } else {
    return {
      isValid: false,
      errorMessage: result.error.errors[0]?.message || "Invalid email",
    };
  }
}

export function emailValidator() {
  const [emailValidatorMessage, setMmailValidatorMessage] = useState<
    string | null
  >(null);

  const validate = (email: string) => {
    const { isValid, errorMessage } = validateEmail(email);

    setMmailValidatorMessage(errorMessage);
    return isValid;
  };

  return {
    validateEmail: validate,
    emailValidatorMessage,
  };
}
