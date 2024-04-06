import useGetProducts from "@/hooks/useGetProducts";
import ProductItem from "../products/product-item";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,

  responsive: [
    {
      breakpoint: 1200, // Adjust breakpoints as needed
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024, // Adjust breakpoints as needed
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

const SellingProducts = () => {
  const { products } = useGetProducts();

  return (
    <>
      <div className="w-full h-[1px] bg-slate-300 mt-20"></div>
      <p className="text-2xl font-semibold my-8">Top Best Seller Products</p>
      <Slider {...settings}>
        {products ? (
          products.map((item) => <ProductItem key={item._id} item={item} />)
        ) : (
          <p>Loading...</p>
        )}
      </Slider>
    </>
  );
};

export default SellingProducts;
