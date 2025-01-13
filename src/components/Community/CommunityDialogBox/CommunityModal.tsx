"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/customUI/Communitydialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";

import { Community } from "@/firebaseServices/CommunityFirebase/CreateCommunity";

const Communities: React.FC = () => {
  // To Reset Values

  // Community Type
  const [CommunityType, setCommunityType] = useState("public");

  // Community Name
  const [communityName, setCommunityName] = useState<string>("communityname");
  const [charsRemaining, setCharsRemaining] = useState<number>(21);

  // Description
  const [totalDescriptionChars, setTotalDescriptionChars] = useState<number>(0);
  const [description, setDescription] = useState<string>(
    "Your community description",
  );

  // Firebase Hook to create Community
  const { CreateCommunity, communityStatus, errorInCreatingCommunity } =
    Community();

  // Error, ErrorMessage, Loading
  const [loading, setloading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMesage] = useState<string>("");

  // Community Name Input Box Change Event
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    if (event.target.value === "communityname") {
      setError;
      setErrorMesage(`"r/communityname" is already taken`);
    }

    setCommunityName(event.target.value);

    setCharsRemaining(21 - event.target.value.length);
  };

  // Community Description Text Area Change Event
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (event.target.value.length > 500) {
      setErrorMesage("Description is too long.");
      return;
    }

    setDescription(event.target.value);

    setTotalDescriptionChars(event.target.value.length);
  };

  // Creates Community
  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCommunityType(event.target.id);
  };

  const handleCreateCommunity = async () => {
    if (error) setError(false);
    // Validate Community name ( RULES: NO Special Char,minnium 3 char reqried )
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(true);
      setErrorMesage("Please lengthen this text to 3 characters or more");
      return;
    }

    CreateCommunity({
      communityName: communityName,
      CommunityType: CommunityType,
    });
  };

  useEffect(() => {
    setCommunityType("public");
    setCommunityName("communityname");
    setCharsRemaining(21);
    setDescription("Your community description");
    setTotalDescriptionChars(0);
    setError(false);
    setErrorMesage("");
  }, []);

  const resetForm = () => {
    setCommunityType("public");
    setCommunityName("communityname");
    setCharsRemaining(21);
    setDescription("Your community description");
    setTotalDescriptionChars(0);
    setError(false);
    setErrorMesage("");
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-full hover:bg-gray-100" onClick={resetForm}>
            Create a Community
          </button>
        </DialogTrigger>

        <DialogContent className="w-full pb-1">
          <DialogHeader>
            <DialogTitle>Tell us about your community</DialogTitle>
            <DialogDescription className="text-xs text-black">
              A name and description help people understand what your community
              is all about.
            </DialogDescription>
          </DialogHeader>
          <div className="flex">
            <div className="grid w-[20rem] gap-4 py-4">
              <div className="grid w-[20rem] grid-cols-4 items-center gap-4">
                <div className="flex w-[20rem] flex-col">
                  <Input
                    id="name"
                    placeholder="Community Name *"
                    onChange={handleChange}
                  />

                  <div className="flex items-center justify-between px-2 text-xs text-red-700">
                    <div>{errorMessage && errorMessage}</div>
                    <div>{charsRemaining}</div>
                  </div>
                  <Textarea
                    id="description"
                    placeholder="Description *"
                    className="mt-5 h-40 resize-none bg-gray-100"
                    onChange={handleChangeDescription}
                  />
                  <div className="flex items-center justify-between px-2 text-xs text-red-700">
                    <div>{errorMessage && errorMessage}</div>
                    <div>{totalDescriptionChars}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-2 flex w-full justify-center">
              <div className="flex max-h-fit w-[13rem] flex-col rounded-xl px-2 py-2 font-bold shadow-lg">
                <div>r/{communityName}</div>
                <div className="flex flex-col text-[0.6rem] font-thin text-gray-500">
                  <div>1 member ·1 online</div>
                  <div className="max-h-[12rem] overflow-y-auto break-words py-1 text-xs text-black">
                    {description}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*           <div className="flex flex-col">
            <div>community Types:</div>
            <div className="flex flex-row">
              <div>
                <div className="flex w-56 items-center justify-between">
                  <div>Public</div>
                  <input
                    type="checkbox"
                    id="public"
                    checked={CommunityType === "public"}
                    onChange={onCommunityTypeChange}
                    className=""
                  />
                </div>
                <div className="flex w-56 items-center justify-between">
                  <div>Restricted</div>
                  <input
                    type="checkbox"
                    id="restricted"
                    checked={CommunityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  />
                </div>
                <div className="flex w-56 items-center justify-between">
                  <div>Private</div>
                  <input
                    type="checkbox"
                    id="private"
                    checked={CommunityType === "private"}
                    onChange={onCommunityTypeChange}
                  />
                </div>
              </div>
            </div>
          </div> */}
          <DialogFooter className="center flex h-fit flex-row items-center justify-between">
            {/* TODO: Next */}
            <div className="mr-auto flex flex-row gap-1">
              <div className="h-[6px] w-[6px] rounded-full bg-black" />
              <div className="h-[6px] w-[6px] rounded-full bg-gray-400" />
              <div className="h-[6px] w-[6px] rounded-full bg-gray-400" />
              <div className="h-[6px] w-[6px] rounded-full bg-gray-400" />
            </div>
            <div className="flex gap-1">
              <button
                type="submit"
                className="rounded-full bg-gray-200 p-2 text-xs font-semibold"
                /* onClick={resetForm} */
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-gray-200 p-2 text-xs font-semibold"
                onClick={handleCreateCommunity}
              >
                Next
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Communities;
