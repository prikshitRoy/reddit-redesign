"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/customUI/Communitydialog";
import SearchBar from "@/components/ui/customUI/SearchBar";
import { useEffect, useState } from "react";

const CommunityTopics: React.FC = () => {
  const [topics, setTopics] = useState<string>("");

  const [onFocus, setOnFocus] = useState<boolean>(false);
  const [onBlur, setOnBlur] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const HandleFocus = () => {
    setOnFocus(true);
    setOnBlur(false);
  };

  const HandleBlur = () => {
    setOnBlur(true);
    setOnFocus(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopics(event.target.value);
  };

  useEffect(() => {}, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add topics</DialogTitle>
        <DialogDescription className="text-xs text-gray-700">
          Add up to 3 topics to help interested redditors find your community.
        </DialogDescription>
        <div className="h-96">
          {/* Search */}
          <SearchBar
            className="mt-9"
            PlaceHolder="Filter topics"
            setOnFocusByUser={onFocus}
            setonBlurByUser={onBlur}
            setErrorByUser={error}
            setInputValueByUser={topics}
            onChange={handleChange}
            onFocus={HandleFocus}
            onBlur={HandleBlur}
          />
        </div>
      </DialogHeader>
    </>
  );
};
export default CommunityTopics;
