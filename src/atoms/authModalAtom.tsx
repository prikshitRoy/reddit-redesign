import { atom } from "recoil";

export interface AuthModalState {
  open: boolean;
  view:
    | "login"
    | "signup"
    | "resetPassword"
    | "verifyEmail"
    | "createUserPassword";
}

const defaultModalState: AuthModalState = {
  open: false,
  view: "login",
};

export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: defaultModalState,
});

/* Because of rerender of SignUp page UseState value is resets so I'm using Recoil */
export interface UserEmail {
  email: string;
}

const defaultUserEmail: UserEmail = {
  email: "",
};
export const userEmailState = atom<UserEmail>({
  key: "userEmailState",
  default: defaultUserEmail,
});
