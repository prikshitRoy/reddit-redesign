import Image from "next/image";

const buttonData = [
  { src: "mobile.svg", text: "Continue with phone number", id: "mobile" },
  { src: "google.svg", text: "Continue with Google", id: "google" },
  { src: "apple.svg", text: "Continue with Apple", id: "apple" },
];

const OAuthButtons: React.FC = () => {
  const onClick = (id: string) => {
    console.log(id, "button Clicked");
  };

  return (
    <>
      <span className="w-72 pb-4 pt-1 text-xs tracking-tight">
        By continuing, you agree to our
        <span className="mx-[4px] text-blue-500 hover:cursor-pointer hover:underline">
          User Agreement
        </span>
        and acknowledge that you understand the
        <span className="ml-[4px] text-blue-500 hover:cursor-pointer hover:underline">
          Privacy Policy.
        </span>
      </span>
      {buttonData.map((button) => (
        <div
          key={button.id}
          className="mb-2 h-[40px] w-72 rounded-[20px] border-[1px] border-solid border-[#dadce0] px-4 text-center hover:cursor-pointer hover:bg-gray-300"
          id={button.id}
          onClick={() => onClick(button.id)}
        >
          <div className="flex h-full flex-row items-center font-sans text-black">
            <Image src={button.src} alt={button.text} height={20} width={20} />
            <span className="flex-grow overflow-hidden overflow-ellipsis text-[14px] font-[450] capitalize tracking-tight">
              {button.text}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};
export default OAuthButtons;
