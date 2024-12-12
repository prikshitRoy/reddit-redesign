import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  className?: string;
}

const Searchinput: React.FC<SearchInputProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "max-w-[600px] flex-grow border-b-2 align-middle",
        className,
      )}
    >
      <div className="relative flex items-center">
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 transform text-muted-foreground">
          <Search className="h-4 w-4" />
        </div>
        <Input
          id="search"
          type="search"
          alt="search"
          placeholder="Search Reddit"
          className="h-[34px] w-[600px] rounded-lg bg-background bg-white pl-8 hover:bg-gray-50 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Searchinput;
