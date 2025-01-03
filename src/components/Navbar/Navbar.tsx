"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Searchinput from "./Searchinput";
import RightContent from "./RightContent/RightContent";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar: React.FC = () => {
  // User
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();
  const Home = () => {
    router.push("/"); // Navigates to the home page
  };

  return (
    <div className="sticky top-0 flex h-[54px] justify-between border border-b-2 pl-[12px] pr-[12px]">
      <div
        className="my-auto flex h-7 w-[40px] cursor-pointer align-middle md:w-auto"
        onClick={Home}
      >
        <Image
          src="redditFace.svg"
          alt="reddit svg"
          height={"40"}
          width={"40"}
        />
        <Image
          src={"redditText.svg"}
          alt="reddit svg"
          height={"80"}
          width={"80"}
        ></Image>
      </div>
      <Searchinput className="my-auto flex" />
      <RightContent className="my-auto flex" user={user} />
    </div>
  );
};

export default Navbar;
