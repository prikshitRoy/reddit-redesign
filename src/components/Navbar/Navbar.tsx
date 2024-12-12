"use client";

import Image from "next/image";
import Searchinput from "./Searchinput";
import RightContent from "./RightContent/RightContent";

const user: boolean = true;

const Navbar: React.FC = () => {
  return (
    <div className="flex h-[54px] justify-between border border-b-2 pl-[12px] pr-[12px]">
      <div
        className="my-auto flex h-7 w-[40px] cursor-pointer border-2 border-black align-middle md:w-auto"
        onClick={() => {}}
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
      <Searchinput className="my-auto flex border-2 border-black" />
      <RightContent
        className="my-auto flex border-2 border-black"
        user={user}
      />
    </div>
  );
};

export default Navbar;
