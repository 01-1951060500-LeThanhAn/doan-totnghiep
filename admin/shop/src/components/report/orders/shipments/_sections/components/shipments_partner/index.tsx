import HomeLayout from "@/layouts/home-layout";
import ShipmentPartnerChart from "./chart/shipment-partner";
import ReportShipmentByPartnerTable from "./card-table";

const ReportShipmentByPartner = () => {
  return (
    <>
      <HomeLayout>
        <ShipmentPartnerChart />
        <ReportShipmentByPartnerTable />
      </HomeLayout>
    </>
  );
};

export default ReportShipmentByPartner;
