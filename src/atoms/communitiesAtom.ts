import { Timestamp } from "@google-cloud/firestore";
import { atom } from "recoil";

// Community Type
export type communityPrivacyType = "public" | "private" | "restricted";
export type Mature = boolean;

// Community Interface
export interface Community {
  id: string;
  creatorId: string;
  numberofMembers: number;
  privacyType: communityPrivacyType;
  mature: Mature;
  createdAt?: Timestamp;
  imageURL?: string;
}

// Default Community Value
const defaultCommunity: Community = {
  id: "",
  creatorId: "",
  numberofMembers: 1,
  privacyType: "public",
  mature: false,
};

export const Community = atom<Community>({
  key: "community",
  default: defaultCommunity,
});

// *******************************************************************

export interface CommunitySnippets {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

interface CommunityState {
  mySnippets: CommunitySnippets[];
  currentCommunity?: Community;
  snippetsFetched: boolean;
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
  snippetsFetched: false,
};

export const CommunityState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});

// Create Community View Stare
// Which Dilog-Box should be open is manage by "CreateCommunityViewState"
export interface CreateCommunityViewState {
  open: boolean;
  disable?: boolean;
  view:
    | "CommunityNameDiscription"
    | "StyleYourCommunity"
    | "CommunityTopics"
    | "CommunityPrivacyType";
}

const defaultCommunityViewState: CreateCommunityViewState = {
  open: false,
  disable: true,
  view: "CommunityNameDiscription",
};

export const createCommunityViewState = atom<CreateCommunityViewState>({
  key: "createCommunityViewState",
  default: defaultCommunityViewState,
});

export const viewValues: CreateCommunityViewState["view"][] = [
  "CommunityNameDiscription",
  "StyleYourCommunity",
  "CommunityTopics",
  "CommunityPrivacyType",
];
