"use client";

import { authModalState } from "@/atoms/authModalAtom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/customUI/dialog";
import { useRecoilState } from "recoil";
import ResetPassword from "../ResetPassword/ResetPassword";
import OAuthButtons from "../OAuth/OAuthButtons";
import { ArrowLeft } from "lucide-react";
import AuthInputs from "./AuthInputs";
import { Button } from "../../ui/button";
import { useEffect } from "react";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const user: boolean = false;

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
              {modalState.view == "resetPassword" && (
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
        <div className="grid justify-center">
          <div className="mt-2 text-xl font-bold">
            {modalState.view === "login" && "Log In"}
            {modalState.view == "signup" && "Sign Up"}
            {modalState.view == "resetPassword" && "Reset your password"}
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
          ) : (
            <ResetPassword />
          )}

          {/* TODO */}
          {/* bg-[#D93900] hover:bg-[#AE2C00] */}
          {/* Subbmit Button */}
          <Button className="mt-7 flex w-72 rounded-2xl bg-gray-200 text-xs font-[600] text-gray-400">
            {modalState.view === "login" && "Log In"}
            {modalState.view === "signup" && "Continue"}
            {modalState.view === "resetPassword" && "Reset password"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AuthModal;
