"use client";

import { useRecoilState } from "recoil";
import { auth, db } from "../firebase/clientApp";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { displayNameState, userEmailState } from "@/atoms/authModalAtom";
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

function EmailExist(data: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (data) {
      return true;
    } else return false;
  });
}

export function useSignUpService() {
  const [NewEmail, setNewEmail] = useRecoilState(userEmailState);
  const [displayName, setdisplayName] = useRecoilState(displayNameState);
  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const signUp = async ({ email, password, userName }: UserCredentials) => {
    if (email) {
      setNewEmail({ email: email });

      // TODO: Check if email already exists
      // const emailExist = await EmailExist(email);
    } else if (userName && password) {
      // TODO: Check if email User-Name exists
      //setdisplayName({ name: userName });
      createUserWithEmailAndPassword(NewEmail.email, password);

      //setNewEmail({ email: "" });
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
