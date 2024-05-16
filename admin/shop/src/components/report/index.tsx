import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import ReportView from "./report-view";

const ViewReportPage = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report"
        breadcumbItem="Báo cáo"
        breadcumbPage="Báo cáo kho hàng"
      />

      <ReportView />
    </>
  );
};

export default ViewReportPage;
