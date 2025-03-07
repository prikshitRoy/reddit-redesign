"use client";

import React, { useEffect, useState } from "react";
import RedditTextArea from "@/components/ui/customUI/RedditTextArea";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createCommunity } from "@/atoms/communitiesAtom";

interface CommunityNameProps {
  CommunityDescriptionChange: (data: string) => void;
}

const CommunityDescription: React.FC<CommunityNameProps> = ({
  CommunityDescriptionChange,
}) => {
  // Community Description: description and Char
  const [description, setDescription] = useState<string>("");
  const [totalDescriptionChars, setTotalDescriptionChars] = useState<number>(0);

  // OnFocus State: Community Description
  const [focusedDescription, setFocusedDescription] = useState<boolean>(false);

  // OnBlur State: Community Description
  const [blurDescription, setBlurDescription] = useState<boolean>(false);

  //Error: Community Discription
  const [errorCommunityDiscription, setErrorCommunityDiscription] =
    useState<boolean>(false);

  //Error Mesage: Community Discription
  const [errorMessageCommunityDiscription, setErrorMesageCommunityDiscription] =
    useState<string>("");

  // Loading
  const [loading, setloading] = useState<boolean>(false);

  //Recoil Atom
  const [CommunityData, setCommunityData] = useRecoilState(createCommunity);

  // Handle Change: Community-Description Text Area Change Event
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value);
    CommunityDescriptionChange(event.target.value);

    setCommunityData((prev) => ({
      ...prev,
      description: event.target.value,
    }));

    setTotalDescriptionChars(event.target.value.length);

    if (event.target.value.length > 500) {
      setErrorCommunityDiscription(true);
      setErrorMesageCommunityDiscription("Description is too long.");
    }

    if (event.target.value.length <= 500) {
      setErrorCommunityDiscription(false);
      setErrorMesageCommunityDiscription("");
    }
  };

  // OnFocus: Description
  const handleFocusDescription = () => {
    setFocusedDescription(true);
    setBlurDescription(false);
  };

  // OnBlur: Community Description
  const handleBlurDescription = () => {
    setFocusedDescription(false);
    setBlurDescription(true);
  };

  // Resets evey time component mounts
  useEffect(() => {
    setloading(false);
    setErrorCommunityDiscription(false);
    setErrorMesageCommunityDiscription("");
    setDescription("");
    setFocusedDescription(false);
    setBlurDescription(false);
    setTotalDescriptionChars(0);
  }, []);

  useEffect(() => {
    if (description === "" && CommunityData.description != "") {
      setDescription(CommunityData.description);
      CommunityDescriptionChange(CommunityData.description);
    }
  }, [description]);

  return (
    <>
      <section className="mt-5 h-40">
        <RedditTextArea
          TextAreaPlaceHolder="Description"
          TextAreasetInputValueByUser={description}
          TextAreasetErrorByUser={errorCommunityDiscription}
          TextAreasetOnFocusByUser={focusedDescription}
          TextAreasetonBlurByUser={blurDescription}
          onChange={handleChangeDescription}
          onFocus={handleFocusDescription}
          onBlur={handleBlurDescription}
          value={description}
        />

        <div
          className={`flex items-center justify-between px-2 text-xs ${errorCommunityDiscription && "text-red-700"}`}
        >
          <div>
            {errorMessageCommunityDiscription &&
              errorMessageCommunityDiscription}
          </div>
          <div>{totalDescriptionChars}</div>
        </div>
      </section>
    </>
  );
};
export default CommunityDescription;
