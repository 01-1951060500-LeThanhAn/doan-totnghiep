import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportPaymentsByTime from "../_sections/components/payments_time";
import ReportPaymentsByStaff from "../_sections/components/payments_staff";
import ReportPaymentsByMethod from "../_sections/components/payments_methods";
import ReportPaymentsByOrder from "../_sections/components/payments_orders";

const ViewReportPayments = () => {
  return (
    <>
      <Tabs defaultValue="payents_time">
        <TabsList className="mx-6 mt-4">
          <TabsTrigger value="payents_time">
            <p>Báo cáo thanh toán theo thời gian</p>
          </TabsTrigger>
          <TabsTrigger value="payents_staff">
            <p>Báo cáo thanh toán theo nhân viên</p>
          </TabsTrigger>
          <TabsTrigger value="payents_methods">
            <p>Báo cáo thanh toán theo phương thức</p>
          </TabsTrigger>
          <TabsTrigger value="payents_orders">
            <p>Báo cáo thanh toán theo đơn hàng</p>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payents_time">
          <ReportPaymentsByTime />
        </TabsContent>
        <TabsContent value="payents_staff">
          <ReportPaymentsByStaff />
        </TabsContent>
        <TabsContent value="payents_methods">
          <ReportPaymentsByMethod />
        </TabsContent>
        <TabsContent value="payents_orders">
          <ReportPaymentsByOrder />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ViewReportPayments;
