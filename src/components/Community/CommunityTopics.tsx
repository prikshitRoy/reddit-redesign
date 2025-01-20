"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/customUI/Communitydialog";
import SearchBar from "@/components/ui/customUI/SearchBar";
import TopicsData from "./RedditRefineTopics.json";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface SearchParams {
  searchIn: string;
  searchFor: string;
}

const CommunityTopics: React.FC = () => {
  const [topicSearch, setTopicSearch] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);

  const [onFocus, setOnFocus] = useState<boolean>(false);
  const [onBlur, setOnBlur] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Search condtion
  const isSearchActive = topicSearch === "";
  function Search({ searchIn, searchFor }: SearchParams): boolean {
    return (
      searchFor !== "" &&
      searchIn.toLowerCase().includes(searchFor.toLowerCase())
    );
  }

  const HandleFocus = () => {
    setOnFocus(true);
    setOnBlur(false);
  };

  const HandleBlur = () => {
    setOnBlur(true);
    setOnFocus(false);
    if (topics.length === 3) {
    }
  };

  // If the topic is already included, it removes the topic from the list.
  // If the topic is not included, it adds the topic to the list.
  const HandleTopics = (t: string) => {
    if (topics.includes(t)) {
      setError(false);
      setTopics(topics.filter((topic) => topic !== t));
    } else if (topics.length === 3) {
      setError(true);
      setErrorMessage("Only 3 topics can be added");
    } else {
      setTopics((prev) => [...prev, t]);
    }
  };

  // Handle Search bar changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicSearch(event.target.value);
  };

  useEffect(() => {
    setTopicSearch("");
    setOnFocus(false);
    setOnBlur(false);
    setError(false);
    setTopics([]);
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add topics</DialogTitle>
        <DialogDescription className="text-xs text-gray-700">
          Add up to 3 topics to help interested redditors find your community.
        </DialogDescription>
        <div>
          {/* Search Bar */}
          <SearchBar
            className="mt-8"
            PlaceHolder="Filter topics"
            setOnFocusByUser={onFocus}
            setonBlurByUser={onBlur}
            setErrorByUser={false}
            setInputValueByUser={topicSearch}
            onChange={handleChange}
            onFocus={HandleFocus}
            onBlur={HandleBlur}
          />
          <h2 className="flex flex-row gap-1 pt-2 text-xs font-bold text-gray-700">
            <div>Topics</div> <div>{topics.length}/3</div>
          </h2>

          {/* Topics Selected by User */}
          <div className="mt-1 flex h-6 w-[700px] flex-row gap-2">
            {topics &&
              topics.map((item) => (
                <button
                  className="flex h-fit w-fit items-center rounded-[5px] border border-gray-300 pl-2 text-[12px] font-semibold"
                  onClick={() => {
                    HandleTopics(item);
                  }}
                >
                  {item}
                  <CloseButton />
                </button>
              ))}
          </div>
          {/* Error Message */}
          <div className="m-[2px] mb-3 h-[14px] text-[14px] text-red-700">
            {error && <span>{errorMessage}</span>}
          </div>

          {/* List of Topics */}
          <div className="max-h-[330px] overflow-y-auto break-words">
            <ul>
              {Object.entries(TopicsData).map(([category, subtopics]) => (
                <li key={category}>
                  {Search({ searchIn: category, searchFor: topicSearch }) && (
                    <h3 className="text-xs font-bold text-gray-700">
                      {category}
                    </h3>
                  )}
                  {isSearchActive && (
                    <h3 className="text-xs font-bold text-gray-700">
                      {category}
                    </h3>
                  )}

                  {/* subtopics */}
                  <ul className="mb-4 mt-1 flex flex-wrap gap-1">
                    {subtopics.map((subtopic: string) => (
                      <button
                        onClick={() => {
                          HandleTopics(subtopic);
                        }}
                      >
                        <li
                          key={subtopic}
                          className={`mb-[2px] flex h-fit w-fit items-center rounded-full bg-gray-200 pl-2 text-[12px] font-semibold ${topics.includes(subtopic) ? "bg-gray-300" : "py-[6px] pr-2 hover:bg-gray-300"}`}
                        >
                          {Search({
                            searchIn: subtopic,
                            searchFor: topicSearch,
                          }) && (
                            <>
                              {subtopic}
                              {topics.includes(subtopic) && <CloseButton />}
                            </>
                          )}
                          {isSearchActive && (
                            <>
                              {subtopic}
                              {topics.includes(subtopic) && <CloseButton />}
                            </>
                          )}
                        </li>
                      </button>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogHeader>
    </>
  );
};
export default CommunityTopics;

export function CloseButton() {
  return (
    <button className="ml-[2px] flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200">
      <X
        className="h-3 w-3 rounded-full bg-black stroke-white p-[3px]"
        style={{ strokeWidth: "4" }}
      />
    </button>
  );
}
