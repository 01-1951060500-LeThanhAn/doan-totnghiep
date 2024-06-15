import { ReportRevenueByGeneral } from "@/types/report";
import useGetRevenueByGeneral from "../../../hooks/use-get-revenue-general";
import ReportRevenueGeneralTable from "./report-revenue-table";

const ReportRevenueByGenenalTable = () => {
  const { revenueGeneral } = useGetRevenueByGeneral();
  return (
    <>
      <ReportRevenueGeneralTable
        data={revenueGeneral as ReportRevenueByGeneral[]}
      />
    </>
  );
};

export default ReportRevenueByGenenalTable;
