import HomeLayout from "@/layouts/home-layout";
import ShipmentGeneralChart from "./chart/shipment-general";
import ReportShipmentByGeneralTable from "./card-table";

const ReportShipmentByGeneral = () => {
  return (
    <>
      <HomeLayout>
        <ShipmentGeneralChart />
        <ReportShipmentByGeneralTable />
      </HomeLayout>
    </>
  );
};

export default ReportShipmentByGeneral;
