import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import VerifyEmail from "../SignUp/VerifyEmail";
import CreateUserPassword from "../SignUp/CreateUserPassword";

import { useRecoilValue } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import ResetPassword from "../ResetPassword/ResetPassword";

const AuthInputs: React.FC = () => {
  const modalState = useRecoilValue(authModalState);

  return (
    <>
      {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <SignUp />}
      {modalState.view === "verifyEmail" && <VerifyEmail />}
      {modalState.view === "createUserPassword" && <CreateUserPassword />}
      {modalState.view === "resetPassword" && <ResetPassword />}
    </>
  );
};
export default AuthInputs;
