"use client";

type PageContentProps = { children: React.ReactNode };

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <main className="flex justify-center py-16">
      <div className="flex w-[95%] max-w-[860px] justify-center">
        {/* Left Hand Side */}
        <section className="flex flex-col">
          {children && children[0 as keyof typeof children]}
        </section>
        {/* Right Hand Side */}
        <section className="flex flex-col">
          {children && children[1 as keyof typeof children]}
        </section>
      </div>
    </main>
  );
};
export default PageContent;
