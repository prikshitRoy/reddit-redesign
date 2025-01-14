"use client";

import CommunityNameDescription from "../CommunityNameDescription";
import CommunityPrivacyType from "../CommunityPrivacyType";
import CommunityTopics from "../CommunityTopics";
import StyleYourCommunity from "../StyleYourCommunity";

const CommunityViewState: React.FC = () => {
  return (
    <>
      <CommunityNameDescription />
      <StyleYourCommunity />
      <CommunityTopics />
      <CommunityPrivacyType />
    </>
  );
};
export default CommunityViewState;
