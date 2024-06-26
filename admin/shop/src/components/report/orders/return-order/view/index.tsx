import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportReturnOrderByProduct from "../components/return-orders-products";

const ViewReturnOrderPage = () => {
  return (
    <>
      <Tabs defaultValue="return_orders_products">
        <TabsList className="mx-6 mt-4">
          <TabsTrigger value="return_orders_products">
            <p>Báo cáo trả hàng theo sản phẩm</p>
          </TabsTrigger>
          <TabsTrigger value="payents_staff">
            <p>Báo cáo trả hàng theo khách hàng</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="return_orders_products">
          <ReportReturnOrderByProduct />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ViewReturnOrderPage;
