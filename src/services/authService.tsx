"use client";

import { auth, db } from "../firebase/clientApp";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
interface UserCredentials {
  email?: string;
  password?: string;
  userName?: string;
}

export function useLoginService() {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const logIn = ({ email, password }: UserCredentials) => {
    if (email && password) {
      signInWithEmailAndPassword(email, password);
    }
  };

  return {
    logIn,
    user,
    loading,
    error,
  };
}

export function useSignUpService() {
  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const signUp = ({ email, password, userName }: UserCredentials) => {
    if (email) {
      //console.log("newEmail:", email);
    } else if (userName && password) {
      createUserWithEmailAndPassword(userName, password);
    }
  };

  return {
    signUp,
    userCred,
    loading,
    userError,
  };
}

function resetPasswordService(credentials: UserCredentials) {
  console.log("Email:", credentials.email);
}

function verifyEmailService(credentials: UserCredentials) {
  console.log("Email:", credentials.email);
}

export { resetPasswordService, verifyEmailService };
