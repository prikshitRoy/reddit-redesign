import { Timestamp } from "@google-cloud/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorId: string;
  numberofMembers: number;
  privacyType: "public" | "private" | "restricted";
  createdAt?: Timestamp;
  imageURL?: string;
}

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
