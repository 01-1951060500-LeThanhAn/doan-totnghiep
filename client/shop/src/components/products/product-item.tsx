import { ProductData } from "@/types";
import { ShoppingCart } from "lucide-react";
import { IoStar } from "react-icons/io5";
type Props = {
  item: ProductData;
};

const ProductItem = ({ item }: Props) => {
  return (
    <>
      <div className="border border-slate-200 h-96 mx-1">
        <div className="h-64 relative">
          <img className="" src={item?.img || ""} alt={item.title} />
          <div className="absolute flex justify-center items-center bottom-0 left-0 right-0 w-full h-0 hover:h-10 transition-all ease-in-out bg-black text-white">
            <ShoppingCart className="w-4 h-4" />
            <p className="text-sm ml-2">Add to Cart</p>
          </div>
        </div>

        <div className="p-2">
          <p className="font-semibold">{item.title.slice(0, 40)}...</p>
          <span className="text-yellow-500">${item?.price}</span>
          <div className="flex items-center">
            <div className="flex items-center my-2">
              <IoStar color="orange" />
              <IoStar color="orange" />
              <IoStar color="orange" />
              <IoStar color="orange" />
              <IoStar color="orange" />
            </div>

            <p className="text-sm text-slate-300 ml-2">(5 reviews)</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
