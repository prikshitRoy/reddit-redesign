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
import { useRecoilState } from "recoil";
import { createCommunity } from "@/atoms/communitiesAtom";

const CommunityTopics: React.FC = () => {
  const [topicSearch, setTopicSearch] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);

  const [onFocus, setOnFocus] = useState<boolean>(false);
  const [onBlur, setOnBlur] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [communityData, setCommunityData] = useRecoilState(createCommunity);

  const redditCommunityTopics: { [key: string]: string[] } = TopicsData;

  //TODO:Add handleMature , filteredData together if posible
  //TODO: Make filteredData more Simple

  //! Search
  const filteredData = Object.entries(TopicsData)
    .filter(([category, subtopics]) => {
      if (topicSearch === "") {
        return true; // Include all categories when search is empty
      }

      return subtopics.some((subtopic: string) =>
        subtopic.toLowerCase().includes(topicSearch.toLowerCase()),
      );
    })
    .map(([category, subtopics]) => ({
      category,
      subtopics:
        topicSearch != ""
          ? subtopics.filter((subtopic: string) =>
              subtopic.toLowerCase().includes(topicSearch.toLowerCase()),
            )
          : subtopics,
    }));

  //! Handle Mature Content Type Category
  //! Setting CommunityCategory and Topics
  function handleMature(topics: string[]) {
    const categories = Array.from(
      new Set(
        topics
          .map(
            (subtopic) =>
              Object.entries(redditCommunityTopics).find(([_, subs]) =>
                subs.includes(subtopic),
              )?.[0],
          )
          .filter((item): item is string => typeof item === "string"),
      ),
    );

    const hasAdultContentOrMatureTopics =
      categories.includes("🟥Adult Content") ||
      categories.includes("🔞Mature Topics");

    // Warnning
    {
      hasAdultContentOrMatureTopics &&
        setErrorMessage(
          "Selecting Mature topics labels your community as 18+ and limits discovery",
        );
      setError(hasAdultContentOrMatureTopics);
    }

    //Set Community Category and Topics
    setCommunityData((prev) => ({
      ...prev,
      communityCategories: categories,
      communityTopics: topics,
      mature: hasAdultContentOrMatureTopics,
    }));

    //console.log("communityTopics", topics);
    //console.log("communityCategories", categories);
  }

  // OnFocus
  const HandleFocus = () => {
    setOnFocus(true);
    setOnBlur(false);
  };

  // OnBlur
  const HandleBlur = () => {
    setOnBlur(true);
    setOnFocus(false);
    if (topics.length === 3) {
    }
  };

  // Set Mature Content Type
  useEffect(() => {
    if (topics) {
      handleMature(topics);
    }
  }, [topics]);

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

  // Reset
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
        <DialogTitle className="mb-1">Add topics</DialogTitle>
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

          <div className="max-h-[330px] overflow-y-auto break-words">
            {/* List of Topics */}
            {filteredData.map(({ category, subtopics }) => (
              <div key={category}>
                {/* category */}
                <h3 className="text-xs font-bold text-gray-700">{category}</h3>

                {/* subtopic */}
                <ul className="mb-4 mt-1 flex flex-wrap gap-1">
                  {subtopics.map((subtopic, index) => (
                    <button
                      onClick={() => {
                        HandleTopics(subtopic);
                      }}
                    >
                      <li
                        key={index}
                        className={`mb-[2px] flex h-fit w-fit items-center rounded-full bg-gray-200 pl-2 text-[12px] font-semibold ${topics.includes(subtopic) ? "bg-gray-300" : "py-[6px] pr-2 hover:bg-gray-300"}`}
                      >
                        {subtopic}
                        {topics.includes(subtopic) && <CloseButton />}
                      </li>
                    </button>
                  ))}
                </ul>
              </div>
            ))}
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
