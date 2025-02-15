import { twMerge } from "tailwind-merge";

interface RedditIconProps {
  className?: string;
}

const PublicCommunityLogo = ({ className }: RedditIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden="true"
      fill="#FFFFFF"
      height="16"
      width="16"
      icon-name="community-fill"
      viewBox="0 0 20 20"
      className={twMerge(
        "h-100 ml-[2px] mr-[2px] mt-[1px] flex items-center justify-center",
        className,
      )}
    >
      <path d="M5.8 9.25H.038A10 10 0 0 1 9.22.039C7.114.879 5.93 5.068 5.8 9.25Zm8.393 0h5.766A10 10 0 0 0 10.78.039c2.106.84 3.29 5.029 3.421 9.211h-.007ZM10 1.375c-1.052 0-2.553 3.045-2.7 7.875h5.4c-.148-4.83-1.649-7.875-2.7-7.875Zm0 17.25c1.051 0 2.552-3.045 2.7-7.875H7.3c.147 4.83 1.648 7.875 2.7 7.875ZM5.8 10.75H.038a10 10 0 0 0 9.182 9.211c-2.106-.84-3.29-5.029-3.42-9.211Zm4.976 9.211a10 10 0 0 0 9.183-9.211H14.2c-.13 4.182-1.315 8.371-3.42 9.211h-.004Z"></path>
    </svg>
  );
};

export default PublicCommunityLogo;
