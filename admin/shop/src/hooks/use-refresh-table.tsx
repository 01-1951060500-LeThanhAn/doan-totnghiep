import { UserData } from "@/types";
import { PartnerData } from "@/types/partner";
import { useState } from "react";

const useRefreshTable = (data: PartnerData[] | UserData[]) => {
  const [tableData, setTableData] = useState(data);

  const refreshTable = () => {
    setTableData(data);
  };

  return { tableData, refreshTable };
};
export default useRefreshTable;
