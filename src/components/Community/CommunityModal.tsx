"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import React, { useState } from "react";

import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { Community } from "@/firebaseServices/CommunityFirebase/CreateCommunity";

const Communities: React.FC = () => {
  const { CreateCommunity, communityStatus, errorInCreatingCommunity } =
    Community();
  const [communityName, setCommunityName] = useState("communityname");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [CommunityType, setCommunityType] = useState("public");
  const [loading, setloading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMesage] = useState<string>("");
  const [user] = useAuthState(auth);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    if (event.target.value === "communityname") {
      setError;
      setErrorMesage(`"r/communityname" is already taken`);
    }

    setCommunityName(event.target.value);

    setCharsRemaining(21 - event.target.value.length);
  };

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
      setErrorMesage(
        "Community name must be between 3-21 character and can only contain letters, numbers or underscores",
      );
      return;
    }

    CreateCommunity({
      communityName: communityName,
      CommunityType: CommunityType,
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-full hover:bg-gray-100">
            Create a Community
          </button>
        </DialogTrigger>

        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Tell us about your community</DialogTitle>
            <DialogDescription className="text-xs">
              A name and description help people understand what your community
              is all about.
            </DialogDescription>
          </DialogHeader>
          <div className="flex">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="name"
                  placeholder="Community Name"
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div>{charsRemaining}</div>
              <div className="text-red-700">{error}</div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="username"
                  placeholder="Description"
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex h-12 w-36 items-center justify-center rounded-lg shadow">
              r/{communityName}
            </div>
          </div>
          <div className="flex flex-col">
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
          </div>
          <DialogFooter>
            {/* TODO: Next */}
            <Button type="submit">Cancel</Button>
            <Button type="submit" onClick={handleCreateCommunity}>
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Communities;
