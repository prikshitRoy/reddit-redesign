"use client";

import React, { useEffect, useState } from "react";
import RedditInput from "@/components/ui/customUI/RedditInput";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { createCommunity, validCommunityName } from "@/atoms/communitiesAtom";
import { useCreateReserveCommunityName } from "@/firebaseServices/CommunityFirebase/CreatedCommunityFirebaseHooks/CreateReservedCommunityNames";

interface CommunityNameProps {
  CommunityNameChange: (data: string) => void;
}

const CommunityName: React.FC<CommunityNameProps> = ({
  CommunityNameChange,
}) => {
  // Community Name: Name and Char
  const [communityName, setCommunityName] = useState<string>("");
  const [charsRemaining, setCharsRemaining] = useState<number>(21);

  //Firebase Hook: Ckeck DB for UniqueCommunityName
  const { CheckCommunityName } = useCreateReserveCommunityName();

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

  //Recoil Atom
  const setCommunity = useSetRecoilState(createCommunity);
  const Community = useRecoilValue(createCommunity);
  const [valid, setValid] = useRecoilState(validCommunityName);

  // Handle Change: Community-Name Input Box Change Event
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    // When Name changes set next button disable
    setValid({ nameExist: undefined });

    if (event.target.value.length > 21) return;

    CommunityNameChange(event.target.value);
    setCommunityName(event.target.value);
    setCommunity((prev) => ({
      ...prev,
      id: event.target.value,
    }));

    setCharsRemaining(21 - event.target.value.length);
  };

  // Remove Error
  const RemoveError = () => {
    setErrorCommunityName(false);
    setErrorMesageCommunityName("");
  };

  // Add Error
  const AddError = (message?: string) => {
    setErrorCommunityName(true);
    if (message) {
      setErrorMesageCommunityName(message);
    } else {
      setErrorMesageCommunityName(
        `${Community.name} already taken. Try another.`,
      );
    }
  };

  // OnFocus
  const handleFocus = () => {
    setIsFocusedCommunityName(true);
    setBlurCommunityName(false);
    RemoveError();
  };

  const communityNameValidaty = async () => {
    // Only proceed if there is no error
    if (communityName.length >= 3) {
      const state = await CheckCommunityName();
      setValid({ nameExist: state });
    }
  };

  // OnBlur
  const handleBlur = () => {
    setBlurCommunityName(true);
    setIsFocusedCommunityName(false);
    CommunityNameCommunityDiscriptionCheck();
    communityNameValidaty();
  };

  //VALIDITY CHECK: Community-Name & Community-Discription
  // TODO: Also Add it to backend
  const CommunityNameCommunityDiscriptionCheck = () => {
    // Validate Community name ( RULES: NO Special Char,minnium 3 char reqried )
    if (communityName != "") {
      const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (format.test(communityName)) {
        AddError("Only letters, numbers and underscore are allowed");
      }
      if (communityName.length < 3) {
        AddError("Please lengthen this text to 3 characters or more");
        setErrorCommunityName(true);
      }
    }
    if (communityName === "communityname") {
      AddError("Community Name already taken");
    }
  };

  //! Community Name valid or not state
  useEffect(() => {
    if (valid.nameExist === undefined || false) {
      RemoveError();
    }
    if (valid.nameExist) {
      AddError();
    }
  }, [valid.nameExist]);

  // Resets evey time component mounts
  useEffect(() => {
    setCommunityName("");
    setCharsRemaining(21);
    RemoveError();

    // When user click back it sets community Name
    if (Community.name) {
      setCommunityName(Community.name);
    }
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
