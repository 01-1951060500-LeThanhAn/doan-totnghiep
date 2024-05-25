import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportRevenueByTime from "../components/revenue_time";
import ReportRevenueByStaff from "../components/revenue_staff";
import ReportRevenueByProduct from "../components/revenue_product";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import ReportRevenueByGeneral from "../components/revenue_general";
import ReportRevenueByCustomer from "../components/revenue_customer";
import ReportRevenueByCustomerGroup from "../components/revenue_customer_group";

const ViewReportRevenue = () => {
  return (
    <>
      <Tabs defaultValue="revenue">
        <CustomScrollbarTable className="mb-3 ">
          <div className="flex flex-col">
            <TabsList className="mx-6 mt-4">
              <TabsTrigger value="revenue">
                <p>Báo cáo doanh thu theo tháng</p>
              </TabsTrigger>
              <TabsTrigger value="revenue_staff">
                <p>Báo cáo doanh thu theo nhân viên</p>
              </TabsTrigger>
              <TabsTrigger value="revenue_product">
                <p>Báo cáo doanh thu theo sản phẩm</p>
              </TabsTrigger>
              <TabsTrigger value="revenue_general">
                <p>Báo cáo doanh thu theo chi nhánh</p>
              </TabsTrigger>
            </TabsList>
            <TabsList className="mx-6 mt-4">
              <TabsTrigger value="revenue_customer">
                <p>Báo cáo doanh thu theo khách hàng</p>
              </TabsTrigger>
              <TabsTrigger value="revenue_orders">
                <p>Báo cáo doanh thu theo đơn hàng</p>
              </TabsTrigger>
              <TabsTrigger value="revenue_customer_group">
                <p>Báo cáo doanh thu theo nhóm khách hàng</p>
              </TabsTrigger>
            </TabsList>
          </div>
        </CustomScrollbarTable>
        <TabsContent value="revenue">
          <ReportRevenueByTime />
        </TabsContent>
        <TabsContent value="revenue_staff">
          <ReportRevenueByStaff />
        </TabsContent>
        <TabsContent value="revenue_product">
          <ReportRevenueByProduct />
        </TabsContent>
        <TabsContent value="revenue_general">
          <ReportRevenueByGeneral />
        </TabsContent>
        <TabsContent value="revenue_customer">
          <ReportRevenueByCustomer />
        </TabsContent>
        <TabsContent value="revenue_customer_group">
          <ReportRevenueByCustomerGroup />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ViewReportRevenue;
