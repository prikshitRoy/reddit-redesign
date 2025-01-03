"use client";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/clientApp";

interface UserCredentials {
  email?: string;
  password?: string;
}

function LoginService(credentials: UserCredentials) {
  console.log("Email:", credentials.email);
  console.log("Password:", credentials.password);
}

async function SignUpService(credentials: UserCredentials) {
  console.log("Sending Email:", credentials.email);

  try {
    const docRef = await addDoc(collection(db, "emailVerification"), {
      emailId: credentials.email,
    });
    console.log("Document written with ID: ", docRef.id);

    // TODO: Send Email
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function resetPasswordService(credentials: UserCredentials) {
  console.log("Email:", credentials.email);
}

function verifyEmailService(credentials: UserCredentials) {
  console.log("Email:", credentials.email);
}

export {
  LoginService,
  SignUpService,
  resetPasswordService,
  verifyEmailService,
};
