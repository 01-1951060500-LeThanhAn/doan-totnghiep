import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import ReportGrnView from "./report-grn-view";

const ReportGoodReceivedNoteMain = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/grn/analytic_grn"
        breadcumbItem="Báo cáo nhập hàng"
        breadcumbPage="Nhập hàng"
      />
      <ReportGrnView />
    </>
  );
};

export default ReportGoodReceivedNoteMain;
