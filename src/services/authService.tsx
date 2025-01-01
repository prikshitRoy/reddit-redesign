"use client";

interface UserCredentials {
  email?: string;
  password?: string;
}

function LoginService(credentials: UserCredentials) {
  console.log("Email:", credentials.email);
  console.log("Password:", credentials.password);
}

function SignUpService(credentials: UserCredentials) {
  console.log("Email:", credentials.email);
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
