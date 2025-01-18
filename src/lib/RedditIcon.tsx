import { twMerge } from "tailwind-merge";

interface RedditIconProps {
  className?: string;
}

const RedditIcon = ({ className }: RedditIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden="true"
      fill="#D93900"
      height="16"
      width="16"
      icon-name="community-fill"
      viewBox="0 0 20 20"
      className={twMerge(
        "h-100 ml-[2px] mr-[2px] mt-[1px] flex items-center justify-center",
        className,
      )}
    >
      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0ZM8.016 8.633a1.616 1.616 0 0 0-.2.806V13.5H5.931V6.172h1.8v.9h.039a3.009 3.009 0 0 1 1.018-.732 3.45 3.45 0 0 1 1.449-.284c.246-.003.491.02.732.068.158.024.309.08.444.164l-.759 1.832a2.09 2.09 0 0 0-1.093-.26c-.33-.01-.658.062-.954.208a1.422 1.422 0 0 0-.591.565Zm2.9 6.918H9.355L14.7 2.633c.426.272.828.58 1.2.922l-4.984 11.996Z" />
    </svg>
  );
};

export default RedditIcon;
