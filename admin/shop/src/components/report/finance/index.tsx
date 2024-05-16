import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import FinanceView from "./view/finance-view";

const ViewFinancepage = () => {
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/report/finance"
        breadcumbItem="Báo cáo tài chính"
        breadcumbPage="Danh sách báo cáo tài chính"
      />
      <FinanceView />
    </>
  );
};

export default ViewFinancepage;
