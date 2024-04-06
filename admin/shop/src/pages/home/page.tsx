import DashBoardLayout from "@/layouts/layout";
import Chart from "@/components/charts/chart";
import Header from "@/components/header/header";
import TableData from "@/components/table";
import ViewBox from "@/components/viewbox/view-box";
import HomeLayout from "@/layouts/home-layout";

const HomePage = () => {
  return (
    <DashBoardLayout className="sm:p-6 md:p-8">
      <HomeLayout>
        <Header />
        <ViewBox />
        <Chart />
        <TableData />
      </HomeLayout>
    </DashBoardLayout>
  );
};

export default HomePage;
