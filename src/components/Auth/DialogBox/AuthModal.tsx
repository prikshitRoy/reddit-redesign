"use client";

import { authModalState } from "@/atoms/authModalAtom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/customUI/dialog";
import { useRecoilState } from "recoil";
import OAuthButtons from "../OAuth/OAuthButtons";
import { ArrowLeft } from "lucide-react";
import AuthInputs from "./AuthInputs";
import { useEffect } from "react";
import AuthSubmitButton from "./AuthSubmitButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const back = () => {
    setModalState((prev) => ({
      ...prev,
      view: "login",
    }));
  };

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    if (user) handleClose();
    console.log("User:", user);
  }, [user]);

  const viewsWithBackButton = [
    "resetPassword",
    "verifyEmail",
    "createUserPassword",
  ];

  return (
    <Dialog open={modalState.open} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[530px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {/* Back Button on ResetPassword */}
            <div className="flex flex-row items-center">
              {viewsWithBackButton.includes(modalState.view) && (
                <div
                  className="absolute mt-2 flex h-[6.5] w-[6.5] rounded-full p-1 hover:cursor-pointer hover:bg-gray-300"
                  onClick={back}
                >
                  <ArrowLeft
                    strokeWidth={1}
                    className="h-full w-full items-center"
                  />
                </div>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>
        {/* Login, Sign Up or ResetPassword */}
        <div className="grid h-[30rem] justify-center">
          <div className="mt-2 w-64 text-xl font-bold">
            {modalState.view === "login" && "Log In"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset your password"}
            {modalState.view === "verifyEmail" && "Verify your email"}
            {modalState.view === "createUserPassword" &&
              "Create your username and password"}
          </div>
          {modalState.view === "login" || modalState.view === "signup" ? (
            <>
              <OAuthButtons />

              <div className="flex w-72 items-center pb-2 pt-1 text-[12px] font-medium text-gray-500">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Login and SignUp */}
              <AuthInputs />
            </>
          ) : modalState.view === "verifyEmail" ||
            modalState.view === "createUserPassword" ||
            modalState.view === "resetPassword" ? (
            <>
              <AuthInputs />
            </>
          ) : (
            <></>
          )}

          {/* Subbmit Button */}
          <AuthSubmitButton />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AuthModal;
