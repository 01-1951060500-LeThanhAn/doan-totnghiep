import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import ReportRevenueGrnByTime from "../components/revenue_time";
import ReportRevenueGrnByStaff from "../components/revenue_staff";
import ReportRevenueGrnByProduct from "../components/revenue_product";
import ReportRevenueGrnByGeneral from "../components/revenue_general";
import ReportRevenueGrnBySuppliers from "../components/revenue_supplier";

const ViewReportRevenueGrn = () => {
  return (
    <>
      <Tabs defaultValue="revenue">
        <CustomScrollbarTable className="mb-3">
          <div className="">
            <TabsList className="mx-6 mt-4">
              <TabsTrigger value="revenue">
                <p>Báo cáo hàng nhập kho theo tháng</p>
              </TabsTrigger>
              <TabsTrigger value="revenue_staff">
                <p>Báo cáo hàng nhập kho theo nhân viên</p>
              </TabsTrigger>
              <TabsTrigger value="revenue_product">
                <p>Báo cáo hàng nhập kho theo sản phẩm</p>
              </TabsTrigger>
              <TabsTrigger value="revenue_general">
                <p>Báo cáo hàng nhập kho theo chi nhánh</p>
              </TabsTrigger>
              <TabsTrigger value="revenue_supplier">
                <p>Báo cáo hàng nhập kho theo nhà cung cấp</p>
              </TabsTrigger>
            </TabsList>
          </div>
        </CustomScrollbarTable>
        <TabsContent value="revenue">
          <ReportRevenueGrnByTime />
        </TabsContent>
        <TabsContent value="revenue_staff">
          <ReportRevenueGrnByStaff />
        </TabsContent>
        <TabsContent value="revenue_product">
          <ReportRevenueGrnByProduct />
        </TabsContent>
        <TabsContent value="revenue_general">
          <ReportRevenueGrnByGeneral />
        </TabsContent>
        <TabsContent value="revenue_supplier">
          <ReportRevenueGrnBySuppliers />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ViewReportRevenueGrn;
