import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis } from "lucide-react";

type User = boolean;

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  return (
    <div className="my-auto flex items-center justify-center rounded-full p-[3px] hover:bg-gray-300">
      {user ? (
        <Avatar className="h-7 w-7">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <Ellipsis className="h-4 w-4" />
      )}
    </div>
  );
};

export default UserMenu;
