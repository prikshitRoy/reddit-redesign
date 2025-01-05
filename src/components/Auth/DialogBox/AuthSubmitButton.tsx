"use client";

import { useRecoilState } from "recoil";

import { Button } from "../../ui/button";
import { authModalState } from "@/atoms/authModalAtom";
import { authOnClickState } from "@/atoms/authOnClickAtom";

function AuthSubmitButton() {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [clickState, setClickState] = useRecoilState(authOnClickState);

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
      {/* Subbmit Button */}
      <Button
        className={`${clickState.disable ? "bg-gray-200 text-gray-400" : "bg-[#D93900] text-white hover:bg-[#AE2C00]"} mt-7 flex w-72 rounded-2xl text-xs font-[600]`}
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
