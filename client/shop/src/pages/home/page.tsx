import Banner from "@/components/banner/banner";
import SellingProducts from "@/components/seller/selller-product";
import MainLayout from "@/layout/layout";

const HomePage = () => {
  return (
    <>
      <MainLayout className="mt-12">
        <Banner />
        <SellingProducts />
      </MainLayout>
    </>
  );
};

export default HomePage;
