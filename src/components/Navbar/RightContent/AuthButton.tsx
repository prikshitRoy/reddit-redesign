import { authModalState } from "@/atoms/authModalAtom";
import { Button } from "@/components/ui/button";
import { useSetRecoilState } from "recoil";

const AuthButton: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <div className="flex">
      <Button
        className="h-4 w-fit rounded-3xl bg-[#D93900] p-4 text-sm hover:bg-[#AE2C00]"
        onClick={() => setAuthModalState({ open: true, view: "login" })}
      >
        Log In
      </Button>
    </div>
  );
};

export default AuthButton;
