import React from "react";
import PageContent from "@/components/Layout/PageContent";
import NavigationMenu from "@/components/PageStructure/LeftSide/NavigationMenu";
import CenterAndRightSide from "@/components/PageStructure/CenterAndRightSide/CenterAndRightSide";

const Home: React.FC = () => {
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

          <CenterAndRightSide />
        </div>
      </>
    </PageContent>
  );
};
export default Home;
