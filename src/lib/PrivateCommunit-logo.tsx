import { twMerge } from "tailwind-merge";

interface RedditIconProps {
  className?: string;
}

const PrivateCommunityLogo = ({ className }: RedditIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden="true"
      fill="#000000"
      height="16"
      width="16"
      icon-name="community-fill"
      viewBox="0 0 20 20"
      className={twMerge(
        "h-100 ml-[2px] mr-[2px] mt-[1px] flex items-center justify-center",
        className,
      )}
    >
      <path d="M16.375 8H15V5.312A5.17 5.17 0 0 0 10 0a5.169 5.169 0 0 0-5 5.312V8H3.625A1.629 1.629 0 0 0 2 9.63v7.74A1.629 1.629 0 0 0 3.625 19h12.75A1.629 1.629 0 0 0 18 17.37V9.63A1.629 1.629 0 0 0 16.375 8ZM6.25 5.312A3.92 3.92 0 0 1 10 1.25a3.92 3.92 0 0 1 3.75 4.062V8h-7.5V5.312Zm10.5 12.058a.378.378 0 0 1-.375.38H3.625a.378.378 0 0 1-.375-.38V9.63a.383.383 0 0 1 .375-.38h12.75a.378.378 0 0 1 .375.38v7.74Z" />
    </svg>
  );
};

export default PrivateCommunityLogo;

