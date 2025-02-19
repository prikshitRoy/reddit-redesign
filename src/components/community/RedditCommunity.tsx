"use client";

import { Community } from "@/atoms/communitiesAtom";

type RedditCommunityProps = {
  communityData: Community;
};

//TODO: View - Card, Compact
//TODO: Sort by: Hot, New, Top, Rising

const RedditCommunity: React.FC<RedditCommunityProps> = ({ communityData }) => {
  return (
    <>
      <div className="border border-black">
        <div>{communityData.communityTopics}</div>
        <div>{communityData.name}</div>
        <div>{communityData.communityCategories}</div>
      </div>
    </>
  );
};

export default RedditCommunity;
