import HomeLayout from "@/layouts/home-layout";
import ShipmentMethodChart from "./chart/shipment-method";
import ReportShipmentByMethodTable from "./card-table";

const ReportShipmentGrnByMethod = () => {
  return (
    <>
      <HomeLayout>
        <ShipmentMethodChart />
        <ReportShipmentByMethodTable />
      </HomeLayout>
    </>
  );
};

export default ReportShipmentGrnByMethod;
