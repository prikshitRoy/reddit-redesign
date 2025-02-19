"use client";

import React from "react";
import PageContent from "@/components/Layout/PageContent";
import NavigationMenu from "@/components/PageStructure/LeftSide/NavigationMenu";

type MainPageProps = { children: React.ReactNode };

const MainPage: React.FC<MainPageProps> = ({ children }) => {
  return (
    <PageContent>
      {/* Left Hand Side */}
      <>
        {/* TODO: */}

        {/* Side Bar */}
        <NavigationMenu />
      </>
      <>
        {/* Center and Right Hand Side */}
        <div>
          {/* TODO: */}

          {children}
        </div>
      </>
    </PageContent>
  );
};
export default MainPage;
