"use client";

import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

const ResetOrNewUser: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <>
      {/* Reset Password */}
      <div
        className="mt-5 w-fit text-xs tracking-tight text-blue-600 hover:text-blue-400"
        onClick={() => {
          setAuthModalState((prev) => ({
            ...prev,
            view: "resetPassword",
          }));
        }}
      >
        <span className="hover:cursor-pointer">Forgot password?</span>
      </div>

      {/* Register New User */}
      <div className="mt-[10px] flex space-x-1 text-xs tracking-tight">
        <div>New to Reddit?</div>{" "}
        <div
          className="text-blue-600 hover:cursor-pointer hover:text-blue-400"
          onClick={() => {
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }));
          }}
        >
          Sign Up
        </div>
      </div>
    </>
  );
};
export default ResetOrNewUser;
