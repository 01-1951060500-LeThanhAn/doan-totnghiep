import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { banner, banners } from "@/constant/banner";
import BannerItem from "./banner-item";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,

  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  easing: "ease-in-out",
};

const Banner = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-3 gap-y-3">
        <div className="col-span-2">
          <Slider {...settings}>
            {banners.map((item) => (
              <BannerItem key={item.id} item={item} />
            ))}
          </Slider>
        </div>
        <div>
          {banner.map((item) => (
            <div key={item.id}>
              <img
                className={`w-full object-cover h-auto lg:h-[120px] ${
                  item.id === 1 ? "" : "my-3"
                }`}
                src={item.img}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Banner;
