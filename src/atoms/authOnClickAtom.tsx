import { atom } from "recoil";
import { AuthModalState } from "./authModalAtom";

export interface AuthOnClickState {
  disable?: boolean;
  error?: boolean;
  clickedOn?: AuthModalState["view"];
}

const defaultauthOnClickState: AuthOnClickState = {
  disable: false,
  error: false,
  clickedOn: undefined,
};

export const authOnClickState = atom<AuthOnClickState>({
  key: "authOnClickState",
  default: defaultauthOnClickState,
});
