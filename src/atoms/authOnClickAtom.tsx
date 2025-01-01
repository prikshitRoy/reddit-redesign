import { atom } from "recoil";
import { AuthModalState } from "./authModalAtom";

export interface AuthOnClickState {
  error?: boolean;
  clickedOn?: AuthModalState["view"];
}

const defaultauthOnClickState: AuthOnClickState = {
  error: false,
  clickedOn: undefined,
};

export const authOnClickState = atom<AuthOnClickState>({
  key: "authOnClickState",
  default: defaultauthOnClickState,
});
