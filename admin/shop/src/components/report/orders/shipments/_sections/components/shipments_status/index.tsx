import HomeLayout from "@/layouts/home-layout";
import ShipmentStatusChart from "./chart/shipment-status";

const ReportShipmentsByStatus = () => {
  return (
    <>
      <HomeLayout>
        <ShipmentStatusChart />
      </HomeLayout>
    </>
  );
};

export default ReportShipmentsByStatus;
