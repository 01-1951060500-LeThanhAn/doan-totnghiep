import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportPurchaseOrderByTime from "../components/purchase_orders_time";
import ReportPurchaseOrderByProduct from "../components/purchase_orders_product";
import ReportPurchaseOrderBySupplier from "../components/purchase_orders_supplier";

const ViewReportPurchaseOrders = () => {
  return (
    <>
      <Tabs defaultValue="purchase_orders">
        <div className="">
          <TabsList className="mx-6 mt-4">
            <TabsTrigger value="purchase_orders">
              <p>Báo cáo đặt hàng theo thời gian</p>
            </TabsTrigger>

            <TabsTrigger value="purchase_orders_products">
              <p>Báo cáo đặt hàng theo sản phẩm </p>
            </TabsTrigger>
            <TabsTrigger value="purchase_orders_suppliers">
              <p>Báo cáo đặt hàng theo nhà cung cấp </p>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="purchase_orders">
          <ReportPurchaseOrderByTime />
        </TabsContent>

        <TabsContent value="purchase_orders_products">
          <ReportPurchaseOrderByProduct />
        </TabsContent>
        <TabsContent value="purchase_orders_suppliers">
          <ReportPurchaseOrderBySupplier />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ViewReportPurchaseOrders;
