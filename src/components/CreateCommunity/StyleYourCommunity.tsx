"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/customUI/Communitydialog";
import Image from "next/image";
import RedditIcon from "@/lib/RedditIcon";
import { useRecoilValue } from "recoil";
import { Community, createCommunity } from "@/atoms/communitiesAtom";

const StyleYourCommunity: React.FC = () => {
  const Community = useRecoilValue(createCommunity);

  //TODO: Community Banner and Icon support

  return (
    <>
      <DialogHeader>
        <DialogTitle className="mb-1">Style your community</DialogTitle>
        <DialogDescription className="text-xs text-black">
          <div>
            Adding visual flair will catch new members attention and help
            establish your community’s culture!
          </div>
          <div>You can update this at any time.</div>
        </DialogDescription>
        <div className="flex flex-row justify-between pb-16 pr-3 pt-3">
          {/* Banner and Icon */}
          <div className="flex w-72 flex-col gap-3 pt-4">
            {/* Banner */}
            <div className="flex items-center justify-between text-xs text-gray-800">
              <div>Banner</div>
              <div className="flex flex-row rounded-full bg-gray-200 px-2 hover:bg-gray-300">
                <Image
                  src={"/bannericon.svg"}
                  alt=""
                  width={20}
                  height={20}
                  className="p1"
                />
                <div className="p-1 text-[13px] font-semibold">Add</div>
              </div>
            </div>
            {/* Icon */}
            <div className="flex items-center justify-between text-xs text-gray-800">
              <div>Icon</div>
              <div className="flex flex-row rounded-full bg-gray-200 px-2 hover:bg-gray-300">
                <Image
                  src={"/bannericon.svg"}
                  alt=""
                  width={20}
                  height={20}
                  className="p1"
                />
                <div className="p-1 text-[13px] font-semibold">Add</div>
              </div>
            </div>

            {/* <Input id="file" type="file" placeholder="File" accept="image/*" /> */}
          </div>

          {/* Community Look */}
          <div className="flex max-h-fit w-[15rem] flex-col rounded-xl font-bold shadow-md shadow-gray-400">
            <div className="sticky top-0 h-5 w-full rounded-t-lg bg-red-100" />
            <div className="p-3">
              <div className="flex flex-row">
                <div className="pr-3">
                  <RedditIcon className="h-10 w-10 rounded-full border border-[#D93900] p-[2px] hover:border-[#AE2C00] hover:fill-[#AE2C00]" />
                </div>

                <div className="flex flex-col">
                  <div
                    className="m-0 w-40 break-words p-0"
                    style={{ lineHeight: "1", marginBottom: "0" }}
                  >
                    r/
                    {Community.name != "" ? Community.name : "communityname"}
                  </div>
                  <div className="text-[0.6rem] font-thin text-gray-500">
                    1 member ·1 online
                  </div>
                </div>
              </div>

              <div className="max-h-[12rem] overflow-y-auto break-words pt-1 text-[0.6rem] text-xs font-thin text-gray-700">
                {Community.description != ""
                  ? Community.description
                  : "Your community description"}
              </div>
            </div>
          </div>
        </div>
      </DialogHeader>
    </>
  );
};
export default StyleYourCommunity;
