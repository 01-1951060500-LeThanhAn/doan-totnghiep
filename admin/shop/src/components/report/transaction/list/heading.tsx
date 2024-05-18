import Header from "../../header";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import useGetTransactions from "../hooks/use-get-all-transaction";
import { useAppDispatch } from "@/hooks/hooks";
import { deleteTransactionAsync } from "@/redux/slices/transactionSlice";
import { useNavigate } from "react-router-dom";

const Heading = () => {
  const { transactions } = useGetTransactions();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(transactions);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setData(transactions);
  }, [transactions]);

  const handleDeleteAllTransactions = async () => {
    setLoading(true);
    try {
      await dispatch(deleteTransactionAsync());
      setData(data);
      toast.success("Xóa lịch sử giao dịch thành công");
      navigate("/dashboard/report");
    } catch (error) {
      setLoading(false);

      toast.error("Xóa lịch sử giao dịch thất bại");
    }
    setLoading(false);
  };
  return (
    <Header
      title="Báo cáo lịch sử giao dịch"
      text1={
        loading ? (
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        ) : (
          "Xóa lịch sử giao dịch"
        )
      }
      text2="Quản lý lịch sử giao dịch"
      onClick={handleDeleteAllTransactions}
    />
  );
};

export default Heading;
