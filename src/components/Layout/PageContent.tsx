"use client";

type PageContentProps = { children: React.ReactNode };

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <main className="flex justify-center">
      <div className="flex w-full justify-center">
        {/* Left Hand Side */}
        <section className="flex w-[16.3rem] flex-col border-r">
          {children && children[0 as keyof typeof children]}
        </section>
        {/* Right Hand Side */}
        <section className="flex w-full flex-col">
          {children && children[1 as keyof typeof children]}
        </section>
      </div>
    </main>
  );
};
export default PageContent;
