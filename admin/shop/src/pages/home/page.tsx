import DashBoardLayout from "@/layouts/layout";
import Chart from "@/components/charts/chart";
import Header from "@/components/header/header";
import ViewBox from "@/components/viewbox/view-box";
import HomeLayout from "@/layouts/home-layout";

const HomePage = () => {
  return (
    <DashBoardLayout className="">
      <HomeLayout>
        <Header />
        <ViewBox />
        <Chart />
      </HomeLayout>
    </DashBoardLayout>
  );
};

export default HomePage;
