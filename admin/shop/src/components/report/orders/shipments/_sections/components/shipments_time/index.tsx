import HomeLayout from "@/layouts/home-layout";
import ShipmentTimeChart from "./chart/shipments-time";

const ReportShipmentsByTime = () => {
  return (
    <>
      <HomeLayout>
        <ShipmentTimeChart />
      </HomeLayout>
    </>
  );
};

export default ReportShipmentsByTime;
