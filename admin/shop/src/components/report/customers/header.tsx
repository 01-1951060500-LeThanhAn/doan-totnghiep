import ListRouteModal from "@/components/modals/routes";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

type Props = {
  title: string;
  text1: string;
  text2: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Header = ({ title, text1, text2, onClick }: Props) => {
  return (
    <>
      <div className="border-b p-6 mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <ListRouteModal />
          <div className="mx-2">
            <span className="text-slate-400 text-sm">Quay lại trang chính</span>
            <p className="font-semibold">{title}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Button
            onClick={onClick}
            type="submit"
            className="mr-3"
            variant="outline"
          >
            <Save className="mr-2" />
            <span>{text1}</span>
          </Button>
          <Button>
            <span>{text2}</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
