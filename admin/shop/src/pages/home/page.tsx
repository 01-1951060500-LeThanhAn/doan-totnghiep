import DashBoardLayout from "@/layouts/layout";
import Header from "@/components/header/header";
import ViewBox from "@/components/viewbox/view-box";
import HomeLayout from "@/layouts/home-layout";
import HomeChart from "@/components/charts";

const HomePage = () => {
  return (
    <DashBoardLayout>
      <HomeLayout>
        <Header />
        <ViewBox />
        <HomeChart />
      </HomeLayout>
    </DashBoardLayout>
  );
};

export default HomePage;
