import { useParams } from "react-router-dom";
import GeneralDetailView from "../view";

const DetailManagementGeneralPage = () => {
  const { generalId } = useParams();
  return <GeneralDetailView id={generalId as string} />;
};

export default DetailManagementGeneralPage;
