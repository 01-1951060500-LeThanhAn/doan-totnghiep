import HomeLayout from "@/layouts/home-layout";
import ShipmentStaffChart from "./chart/shipment-staff";
import ReportShipmentByStaffTable from "./card-table";

const ReportShipmentByStaff = () => {
  return (
    <>
      <HomeLayout>
        <ShipmentStaffChart />
        <ReportShipmentByStaffTable />
      </HomeLayout>
    </>
  );
};

export default ReportShipmentByStaff;
