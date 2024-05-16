import { useParams } from "react-router-dom";
import GoodReceivedNoteDetailView from "../_sections/view";

const DetailGoodReceivedNotePage = () => {
  const { grnId } = useParams();
  return <GoodReceivedNoteDetailView id={grnId as string} />;
};

export default DetailGoodReceivedNotePage;
