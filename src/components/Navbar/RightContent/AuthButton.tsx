import { Button } from "@/components/ui/button";

const AuthButton: React.FC = () => {
  return (
    <div className="flex">
      <Button className="h-4 w-fit rounded-3xl bg-[#D93900] p-4 text-sm hover:bg-[#AE2C00]">
        Log In
      </Button>
    </div>
  );
};

export default AuthButton;
