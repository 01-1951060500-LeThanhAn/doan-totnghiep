import HomeLayout from "@/layouts/home-layout";
import ShipmentCustomerChart from "./chart/shipment-customer";
import ReportShipmentByCustomerTable from "./card-table";

const ReportShipmentByCustomer = () => {
  return (
    <>
      <HomeLayout>
        <ShipmentCustomerChart />
        <ReportShipmentByCustomerTable />
      </HomeLayout>
    </>
  );
};

export default ReportShipmentByCustomer;
