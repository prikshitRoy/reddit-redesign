import { Bell, MessageCircleMoreIcon, Plus } from "lucide-react";

const Icons: React.FC = () => {
  return (
    <div className="my-auto flex gap-[4px]">
      <div className="my-auto flex rounded-full p-[8px] hover:bg-gray-300">
        <MessageCircleMoreIcon className="border-0" />
      </div>

      <div className="my-auto flex rounded-full py-[6.5px] pl-2 pr-3 hover:bg-gray-300">
        <Plus className="mt-[2px]" />
        <div className="text-sm font-semibold">create</div>
      </div>
      <Bell className="my-auto flex size-8 rounded-full p-2 hover:bg-gray-300" />
    </div>
  );
};

export default Icons;
