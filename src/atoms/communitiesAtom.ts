import { Timestamp } from "@google-cloud/firestore";
import { atom } from "recoil";

// Community Type
export type communityPrivacyType = "public" | "private" | "restricted";
export type Mature = boolean;

// Community Interface
export interface Community {
  name: string;
  description: string;
  communityCategories: string[];
  communityTopics: string[];
  creatorId: string;
  numberofMembers: number;
  privacyType: communityPrivacyType;
  mature: Mature;
  matureTopics: boolean;
  createdAt?: Timestamp;
  bannerURL?: string;
  iconURL?: string;
}

// Default Community Value
export const defaultCommunity: Community = {
  name: "",
  description: "",
  communityCategories: [],
  communityTopics: [],
  creatorId: "",
  numberofMembers: 1,
  privacyType: "public",
  mature: false,
  matureTopics: false,
};

export const createCommunity = atom<Community>({
  key: "createCommunity",
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
  disable: boolean;
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

/* Community Name Validation State */
interface ValidCommunityName {
  nameExist: boolean | undefined;
}

const defaultValidCommunityName: ValidCommunityName = {
  nameExist: undefined,
};

export const validCommunityName = atom<ValidCommunityName>({
  key: "validCommunityName",
  default: defaultValidCommunityName,
});
// *******************************************************************
