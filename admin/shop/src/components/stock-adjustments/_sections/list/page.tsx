import { Custombreadcumb } from "@/features/custom-breadcumb";
import Heading from "./heading";
import useGetStockAdjustments from "../../hooks/use-get-stock-adjustments";
import StockAfjustmentTableData from "./card-table";
import { StockAdjustmentTableProps } from "@/types/stock_adjustment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetStatusStockAdjustments from "../../hooks/use-get-status-stock-adjustment";

const StockAdjustmentPage = () => {
  const { stockAdjustments } = useGetStockAdjustments();
  const { stockStatusAdjustments: stockCompleted } =
    useGetStatusStockAdjustments({ status: "completed" });
  const { stockStatusAdjustments: stockPending } = useGetStatusStockAdjustments(
    { status: "pending" }
  );
  const data = stockAdjustments.map((stockAdjustment) => ({
    _id: stockAdjustment?._id,
    code: stockAdjustment?.code,
    desc: stockAdjustment?.desc,
    generalId: stockAdjustment?.generalId?.name,
    staffId: stockAdjustment?.staffId?.username,
    createdAt: stockAdjustment?.createdAt,
    inventory_status: stockAdjustment?.inventory_status,
    updatedAt: stockAdjustment?.updatedAt,
    stocktaking_day: stockAdjustment?.stocktaking_day,
  }));

  const completed = stockCompleted.map((stockAdjustment) => ({
    _id: stockAdjustment?._id,
    code: stockAdjustment?.code,
    desc: stockAdjustment?.desc,
    generalId: stockAdjustment?.generalId?.name,
    staffId: stockAdjustment?.staffId?.username,
    createdAt: stockAdjustment?.createdAt,
    inventory_status: stockAdjustment?.inventory_status,
    updatedAt: stockAdjustment?.updatedAt,
    stocktaking_day: stockAdjustment?.stocktaking_day,
  }));

  const pending = stockPending.map((stockAdjustment) => ({
    _id: stockAdjustment?._id,
    code: stockAdjustment?.code,
    desc: stockAdjustment?.desc,
    generalId: stockAdjustment?.generalId?.name,
    staffId: stockAdjustment?.staffId?.username,
    createdAt: stockAdjustment?.createdAt,
    inventory_status: stockAdjustment?.inventory_status,
    updatedAt: stockAdjustment?.updatedAt,
    stocktaking_day: stockAdjustment?.stocktaking_day,
  }));
  return (
    <>
      <Heading />
      <Custombreadcumb
        href2="/dashboard/stock_adjustments"
        breadcumbItem="Phiếu kiểm hàng"
        breadcumbPage="Danh sách phiếu kiểm hàng"
        linkBtn="/dashboard/stock_adjustments/create"
        title="Tạo phiếu kiểm hàng"
      />

      <Tabs defaultValue="all">
        <TabsList className="mx-6 mt-4">
          <TabsTrigger value="all">
            <p>Tất cả đơn kiểm hàng</p>
          </TabsTrigger>
          <TabsTrigger value="pending">
            <p>Đang kiểm kho</p>
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            <p>Đã cân bằng</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <StockAfjustmentTableData
            data={data as StockAdjustmentTableProps[]}
          />
        </TabsContent>
        <TabsContent value="pending">
          <StockAfjustmentTableData
            data={pending as StockAdjustmentTableProps[]}
          />
        </TabsContent>
        <TabsContent value="cancelled">
          <StockAfjustmentTableData
            data={completed as StockAdjustmentTableProps[]}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default StockAdjustmentPage;
