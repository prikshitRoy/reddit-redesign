"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/customUI/Communitydialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";

const CommunityNameDescription: React.FC = () => {
  // Community Name
  const [communityName, setCommunityName] = useState<string>("communityname");
  const [charsRemaining, setCharsRemaining] = useState<number>(21);

  // Description
  const [totalDescriptionChars, setTotalDescriptionChars] = useState<number>(0);
  const [description, setDescription] = useState<string>(
    "Your community description",
  );

  // Loading
  const [loading, setloading] = useState<boolean>(false);

  // Community Name Error
  const [errorCommunityName, setErrorCommunityName] = useState<boolean>(false);
  const [errorMessageCommunityName, setErrorMesageCommunityName] =
    useState<string>("");

  // Community Discription Error
  const [errorCommunityDiscription, setErrorCommunityDiscription] =
    useState<boolean>(false);
  const [errorMessageCommunityDiscription, setErrorMesageCommunityDiscription] =
    useState<string>("");

  // Community Name Input Box Change Event
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    if (event.target.value === "communityname") {
      setErrorCommunityName(true);
      setErrorMesageCommunityName(`"r/communityname" is already taken`);
    }

    setCommunityName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  // Community Description Text Area Change Event
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (event.target.value.length > 500) {
      setErrorCommunityDiscription(true);
      setErrorMesageCommunityDiscription("Description is too long.");
    }
    if (event.target.value.length < 500) {
      setErrorCommunityDiscription(false);
    }

    setDescription(event.target.value);
    setTotalDescriptionChars(event.target.value.length);
  };

  // FocusOn: Community Name
  const handleFocus = () => {
    setErrorCommunityName(false);
    setErrorMesageCommunityName(""); // Clear error if valid
  };

  // FocusOn: Description
  const handleFocusDescription = () => {
    /*  setErrorCommunityDiscription(false); */
  };

  // FocusOff: Community Name
  const handleBlur = () => {
    CommunityNameCheck();
  };

  //FocusOff: Community Description
  const handleBlurDescription = () => {};

  // Community Name Description Check
  // TODO: Also Add it to backend
  const CommunityNameCheck = () => {
    // Validate Community name ( RULES: NO Special Char,minnium 3 char reqried )
    if (communityName != "communityname" || "") {
      const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (format.test(communityName)) {
        setErrorCommunityName(true);
        setErrorMesageCommunityName(
          "Only letters, numbers and underscore are allowed",
        );
        return;
      }
      if (communityName.length < 3) {
        setErrorCommunityName(true);
        setErrorMesageCommunityName(
          "Please lengthen this text to 3 characters or more",
        );
        return;
      }
    }
  };

  // Resets evey time component mounts
  useEffect(() => {
    setCommunityName("communityname");
    setCharsRemaining(21);
    setDescription("Your community description");
    setTotalDescriptionChars(0);
    setErrorCommunityName(false);
    setErrorMesageCommunityName("");
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Tell us about your community</DialogTitle>
        <DialogDescription className="text-xs text-black">
          A name and description help people understand what your community is
          all about.
        </DialogDescription>
      </DialogHeader>
      <div className="flex">
        <div className="grid w-[20rem] gap-4 py-4">
          <div className="grid w-[20rem] grid-cols-4 items-center gap-4">
            <div className="flex w-[20rem] flex-col">
              <Input
                id="CommunityName"
                placeholder="Community Name *"
                onChange={handleChangeName}
                onFocus={handleFocus} // FocusOn
                onBlur={handleBlur} // FocusOff
              />

              <div
                className={`flex items-center justify-between px-2 text-xs ${errorCommunityName ? "text-red-700" : ""}`}
              >
                <div>
                  {errorMessageCommunityName && errorMessageCommunityName}
                </div>
                <div>{charsRemaining}</div>
              </div>
              <Textarea
                id="CommunityDescription"
                placeholder="Description *"
                className="mt-5 h-40 resize-none bg-gray-100"
                onChange={handleChangeDescription}
                onFocus={handleFocusDescription} // FocusOn
                onBlur={handleBlurDescription} // FocusOff
              />
              <div
                className={`flex items-center justify-between px-2 text-xs ${errorCommunityDiscription ? "text-red-700" : ""}`}
              >
                <div>
                  {errorMessageCommunityDiscription &&
                    errorMessageCommunityDiscription}
                </div>
                <div>{totalDescriptionChars}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-2 flex w-full justify-center">
          <div className="flex max-h-fit w-[13rem] flex-col rounded-xl px-2 py-2 font-bold shadow-lg">
            <div>r/{communityName}</div>
            <div className="flex flex-col text-[0.6rem] font-thin text-gray-500">
              <div>1 member ·1 online</div>
              <div className="max-h-[12rem] overflow-y-auto break-words py-1 text-xs text-black">
                {description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CommunityNameDescription;
