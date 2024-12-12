import { cn } from "@/lib/utils";
import Icons from "./Icons";
import AuthButton from "./AuthButton";
import UserMenu from "./UserMenu";

type User = boolean;

interface RightContentProps {
  className?: string;
  user?: User | null;
}

const RightContent: React.FC<RightContentProps> = ({ className, user }) => {
  return (
    <div className={cn("", className)}>
      {/* TODO */}
      {/* <AuthModal/> */}
      <div className="flex justify-center gap-[10px] align-middle">
        {user ? <Icons /> : <AuthButton />}
        <UserMenu user={user} />
      </div>
    </div>
  );
};

export default RightContent;
