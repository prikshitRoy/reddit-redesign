"use client";

import { authModalState } from "@/atoms/authModalAtom";
import { useRecoilState } from "recoil";
import { Button } from "../../ui/button";
import { authOnClickState } from "@/atoms/authOnClickAtom";
import { useEffect } from "react";

function AuthSubmitButton() {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [clickState, setClickState] = useRecoilState(authOnClickState);

  useEffect(() => {}, [clickState.disable]);

  /* click on signUp continue */
  const onClick = () => {
    console.log("Clicked on:", modalState.view);
    modalState.view === "login" && setClickState({ clickedOn: "login" });
    modalState.view === "resetPassword" &&
      setClickState({ clickedOn: "resetPassword" });
    modalState.view === "signup" && setClickState({ clickedOn: "signup" });
    modalState.view === "verifyEmail" &&
      setClickState({ clickedOn: "verifyEmail" });
    modalState.view === "createUserPassword" &&
      setClickState({ clickedOn: "createUserPassword" });
  };

  return (
    <>
      {/* TODO */}
      {/* bg-[#D93900] hover:bg-[#AE2C00] */}
      {/* Subbmit Button */}
      <Button
        className="mt-7 flex w-72 rounded-2xl bg-gray-200 text-xs font-[600] text-gray-400"
        onClick={onClick}
        disabled={clickState.disable}
      >
        {modalState.view === "login" && "Log In"}
        {modalState.view === "signup" && "Continue"}
        {modalState.view === "verifyEmail" && "Continue"}
        {modalState.view === "createUserPassword" && "Continue"}
        {modalState.view === "resetPassword" && "Reset password"}
      </Button>
    </>
  );
}
export default AuthSubmitButton;
