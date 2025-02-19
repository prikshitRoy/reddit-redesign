"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import MainPage from "@/components/Layout/MainPage";
import RedditCommunity from "@/components/community/RedditCommunity";
import CommunityNotFound from "@/components/community/CommunityNotFound";
import { UseCommunityData } from "@/firebaseServices/CommunityFirebase/CommunityData/CommunityData";

const CommunityPage: React.FC = () => {
  const { getCommunityData } = UseCommunityData();
  const params = useParams();
  const communityId = params.communityId as string;

  // Define the query function first
  const fetchCommunityData = async () => {
    const data = await getCommunityData({ name: communityId });
    return data; // Make sure to return the data
  };

  // Then use it in useQuery
  const {
    data: communityData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["communityData", communityId], // Including communityId in the queryKey
    queryFn: fetchCommunityData,
    enabled: !!communityId, // Only run the query if communityId exists
  });

  if (isLoading) {
    return (
      <MainPage>
        <div>Loading...</div>
      </MainPage>
    );
  }

  if (error) {
    return (
      <MainPage>
        <CommunityNotFound />
      </MainPage>
    );
  }

  return (
    <MainPage>
      {communityData ? (
        <RedditCommunity communityData={communityData} />
      ) : (
        <CommunityNotFound />
      )}
    </MainPage>
  );
};

export default CommunityPage;
