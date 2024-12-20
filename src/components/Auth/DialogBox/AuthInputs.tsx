import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

const AuthInputs: React.FC = () => {
  const modalState = useRecoilValue(authModalState);

  return (
    <>
      {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <SignUp />}
    </>
  );
};
export default AuthInputs;
