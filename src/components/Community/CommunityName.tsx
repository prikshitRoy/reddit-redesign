"use client";

import React, { useEffect, useState } from "react";
import RedditInput from "@/components/ui/customUI/RedditInput";

interface CommunityNameProps {
  CommunityNameChange: (data: string) => void;
}

const CommunityName: React.FC<CommunityNameProps> = ({
  CommunityNameChange,
}) => {
  // Community Name: Name and Char
  const [communityName, setCommunityName] = useState<string>("");
  const [charsRemaining, setCharsRemaining] = useState<number>(21);

  // OnFocus State: Community Name
  const [isFocusedCommunityName, setIsFocusedCommunityName] =
    useState<boolean>(false);

  // OnBlur State: Community Name
  const [isBlurCommunityName, setBlurCommunityName] = useState<boolean>(false);

  // Loading
  const [loading, setloading] = useState<boolean>(false);

  //Error: Community Name
  const [errorCommunityName, setErrorCommunityName] = useState<boolean>(false);
  const [errorMessageCommunityName, setErrorMesageCommunityName] =
    useState<string>("");

  // Handle Change: Community-Name Input Box Change Event
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    CommunityNameChange(event.target.value);

    setCommunityName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  // OnFocus: Community Name
  const handleFocus = () => {
    setIsFocusedCommunityName(true);
    setBlurCommunityName(false);
    setErrorCommunityName(false);
    setErrorMesageCommunityName("");
  };

  // OnBlur: Community Name
  const handleBlur = () => {
    setBlurCommunityName(true);
    setIsFocusedCommunityName(false);
    CommunityNameCommunityDiscriptionCheck();
  };

  //VALIDITY CHECK: Community-Name & Community-Discription
  // TODO: Also Add it to backend
  const CommunityNameCommunityDiscriptionCheck = () => {
    // Validate Community name ( RULES: NO Special Char,minnium 3 char reqried )
    if (communityName != "") {
      const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (format.test(communityName)) {
        setErrorCommunityName(true);
        setErrorMesageCommunityName(
          "Only letters, numbers and underscore are allowed",
        );
      }
      if (communityName.length < 3) {
        setErrorCommunityName(true);
        setErrorMesageCommunityName(
          "Please lengthen this text to 3 characters or more",
        );
      }
    }
    if (communityName === "communityname") {
      setErrorCommunityName(true);
      setErrorMesageCommunityName("Community Name already taken");
    }
  };

  // Resets evey time component mounts
  useEffect(() => {
    setCommunityName("");
    setCharsRemaining(21);
    setErrorCommunityName(false);
    setErrorMesageCommunityName("");
  }, []);

  return (
    <>
      <RedditInput
        id="CommunityName"
        PlaceHolder="Community name"
        setErrorByUser={errorCommunityName}
        setInputValueByUser={communityName}
        setOnFocusByUser={isFocusedCommunityName}
        setonBlurByUser={isBlurCommunityName}
        onChange={handleChangeName}
        onFocus={handleFocus} // FocusOn
        onBlur={handleBlur} // FocusOff
        value={communityName}
      />
      <div
        className={`flex items-center justify-between px-2 text-xs ${errorCommunityName && "text-red-700"}`}
      >
        <div>{errorMessageCommunityName && errorMessageCommunityName}</div>
        <div>{charsRemaining}</div>
      </div>
    </>
  );
};
export default CommunityName;
