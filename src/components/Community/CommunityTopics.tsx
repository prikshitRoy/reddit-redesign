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

const CommunityTopics: React.FC = () => {
  const [topicSearch, setTopicSearch] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);

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
    setTopicSearch(event.target.value);
  };

  useEffect(() => {
    setOnFocus(false);
    setOnBlur(false);
    setError(false);
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
            className="mt-9"
            PlaceHolder="Filter topics"
            setOnFocusByUser={onFocus}
            setonBlurByUser={onBlur}
            setErrorByUser={error}
            setInputValueByUser={topicSearch}
            onChange={handleChange}
            onFocus={HandleFocus}
            onBlur={HandleBlur}
          />
          <h2 className="flex flex-row gap-1 pt-2 text-xs font-bold text-gray-700">
            <div>Topics</div> <div>{topics.length}/3</div>
          </h2>

          {/* Topics Selected by User */}
          <div className="mb-4 mt-1 flex h-6 w-[700px] flex-row gap-2">
            {topics &&
              topics.map((item) => (
                <button className="flex h-fit w-fit rounded-[5px] border border-gray-300 px-2 py-1 text-[12px] font-semibold">
                  {item}
                  <button>
                    <X
                      className="ml-1 h-3 w-3 rounded-full bg-black stroke-white p-[3px]"
                      style={{ strokeWidth: "4" }}
                    />
                  </button>
                </button>
              ))}
          </div>

          {/* List of Topics */}
          <div className="max-h-[350px] overflow-y-auto break-words">
            <ul>
              {Object.entries(TopicsData).map(([category, subtopics]) => (
                <li key={category} className="">
                  <h3 className="text-xs font-bold text-gray-700">
                    {category}
                  </h3>
                  <ul className="mb-4 mt-1 flex flex-wrap gap-1">
                    {subtopics.map((subtopic: string) => (
                      <button
                        onClick={() => setTopics((prev) => [...prev, subtopic])}
                      >
                        <li
                          key={subtopic}
                          className={`mb-[2px] flex h-fit w-fit rounded-full bg-gray-200 px-2 py-[6px] text-[12px] font-semibold ${topics.includes(subtopic) ? "bg-gray-300" : "hover:bg-gray-300"}`}
                        >
                          {subtopic}
                          {topics.includes(subtopic) ? (
                            <button>
                              <X
                                className="ml-1 h-3 w-3 rounded-full bg-black stroke-white p-[3px]"
                                style={{ strokeWidth: "4" }}
                              />
                            </button>
                          ) : (
                            ""
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
