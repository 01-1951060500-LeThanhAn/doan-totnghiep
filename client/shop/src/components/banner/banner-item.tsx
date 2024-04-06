import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  item: {
    img: string;
    title: string;
  };
};
const BannerItem = ({ item }: Props) => {
  return (
    <>
      <div
        className="w-full h-96"
        style={{
          backgroundImage: `url(${item.img})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="p-20 w-3/4 tracking-wide">
          <span className="text-xl text-yellow-500">Daily Deals</span>
          <p className="text-4xl font-bold leading-tight">{item.title}</p>
          <p className="text-xl ">
            Today{" "}
            <span className="text-4xl text-yellow-500 font-bold">$30</span>
          </p>
          <Link to={`/product`}>
            <button className="my-4  flex items-center bg-yellow-500 text-white px-6  py-3">
              Shop Now
              <MoveRight className=" ml-3 " />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BannerItem;
