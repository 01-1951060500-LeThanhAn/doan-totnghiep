import { ArrowLeft, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <>
      <div className="border-b p-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="p-2 cursor-pointer border">
            {" "}
            <Link to={`/dashboard`}>
              <ArrowLeft />
            </Link>
          </div>
          <div className="mx-2">
            <span className="text-slate-400 text-sm">Back to Home page</span>
            <p className="font-semibold">{title}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Button className="mr-3" variant="outline">
            <Save className="mr-2" />
            <span>Save to Draft</span>
          </Button>
          <Button>
            <span>Save Product</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
