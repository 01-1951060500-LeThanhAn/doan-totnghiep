import { useParams } from "react-router-dom";
import GeneralDetailReportInventoriesView from "./detail-general-inventories";

const DetailReportInventoriesPage = () => {
  const { generalId } = useParams();
  return <GeneralDetailReportInventoriesView id={generalId as string} />;
};

export default DetailReportInventoriesPage;
