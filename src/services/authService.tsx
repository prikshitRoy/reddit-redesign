"use client";

import { useRecoilState } from "recoil";
import { auth, db } from "../firebase/clientApp";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { userEmailState } from "@/atoms/authModalAtom";
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
  const [NewEmail, setNewEmail] = useRecoilState(userEmailState);
  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const signUp = ({ email, password, userName }: UserCredentials) => {
    if (email) {
      setNewEmail({ email: email });
    } else if (userName && password) {
      createUserWithEmailAndPassword(NewEmail.email, password);
    }
  };

  return {
    signUp,
    userCred,
    loading,
    userErrorMessage: userError,
  };
}

function resetPasswordService(credentials: UserCredentials) {
  console.log("Email:", credentials.email);
}

function verifyEmailService(credentials: UserCredentials) {
  console.log("Email:", credentials.email);
}

export { resetPasswordService, verifyEmailService };
