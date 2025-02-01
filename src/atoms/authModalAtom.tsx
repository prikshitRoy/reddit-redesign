import { atom, AtomEffect } from "recoil";

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

// User
interface User {
  user: boolean;
  userUid: string;
}

const defaultUser: User = {
  user: false,
  userUid: "",
};

export const redditUser = atom<User>({
  key: "redditUser",
  default: defaultUser,
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

/* DisplayName */
export interface displayName {
  name: string;
}

const defaultdisplayName: displayName = {
  name: "",
};
export const displayNameState = atom<displayName>({
  key: "displayNameState",
  default: defaultdisplayName,
});

// Atom effect for local storage persistence
// const localStorageEffect =
//   (key: string): AtomEffect<UserEmail> =>
//   ({ onSet }) => {};

// export const userEmailState = atom<UserEmail>({
//   key: "userEmailState",
//   default: defaultUserEmail,
//   effects: [localStorageEffect("userEmailState")],
// });
