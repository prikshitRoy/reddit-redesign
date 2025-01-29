"use client";

import React, { useEffect, useState } from "react";
import RedditInput from "@/components/ui/customUI/RedditInput";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  createCommunity,
  createCommunityViewState,
  validCommunityName,
} from "@/atoms/communitiesAtom";
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

  // Recoil: DialogBox view
  const [CommunityView, setCommunityView] = useRecoilState(
    createCommunityViewState,
  );

  // Recoil: validCommunityName provide UniqueCommunityName State
  //Firebase Hook: Ckeck DB for UniqueCommunityName
  const { CheckCommunityName } = useCreateReserveCommunityName();
  const [valid, setValid] = useRecoilState(validCommunityName);

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

  const isCommunityNameValid = async () => {
    if (Community.id === "") return;
    const sameName = await CheckCommunityName();
  };

  // Handle Change: Community-Name Input Box Change Event
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;

    CommunityNameChange(event.target.value);
    setCommunityName(event.target.value);
    setCommunity((prev) => ({
      ...prev,
      id: event.target.value,
    }));

    // Disable Button
    setCommunityView((prev) => ({
      ...prev,
      disable: event.target.value.length <= 3,
    }));

    setCharsRemaining(21 - event.target.value.length);
  };

  // OnFocus: Community Name
  const handleFocus = () => {
    setIsFocusedCommunityName(true);
    setBlurCommunityName(false);
    setErrorCommunityName(false);
    setErrorMesageCommunityName("");
    setValid({ nameExist: false });
  };

  // OnBlur: Community Name
  const handleBlur = async () => {
    setBlurCommunityName(true);
    setIsFocusedCommunityName(false);
    CommunityNameCommunityDiscriptionCheck();
    communityName.length > 3 && isCommunityNameValid();
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

  useEffect(() => {
    if (communityName === "" && Community.id != "") {
      setCommunityName(Community.id);
      CommunityNameChange(Community.id);
    }
  }, [communityName]);

  const HandleError = () => {
    setErrorCommunityName(false);
    setErrorMesageCommunityName("");
  };

  useEffect(() => {
    if (valid.nameExist) {
      setErrorCommunityName(true);
      setErrorMesageCommunityName(
        `${Community.id} already taken. Try another.`,
      );
    }
    if (!valid.nameExist) {
      HandleError();
    }
  }, [valid.nameExist]);

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
