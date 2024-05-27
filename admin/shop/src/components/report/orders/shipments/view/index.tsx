import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import ReportShipmentsByTime from "../_sections/components/shipments_time";
import ReportShipmentsByStatus from "../_sections/components/shipments_status";
import ReportShipmentByStaff from "../_sections/components/shipments_staff";
import ReportShipmentByPartner from "../_sections/components/shipments_partner";
import ReportShipmentByGeneral from "../_sections/components/shipments_general";
import ReportShipmentByCustomer from "../_sections/components/shipments_customer";

const ViewReportShipments = () => {
  return (
    <>
      <Tabs defaultValue="shipments_time">
        <CustomScrollbarTable className="mb-3 ">
          <TabsList className="mx-6 mt-4">
            <TabsTrigger value="shipments_time">
              <p>Báo cáo giao hàng theo thời gian</p>
            </TabsTrigger>
            <TabsTrigger value="shipments_status">
              <p>Báo cáo giao hàng theo tình trạng</p>
            </TabsTrigger>
            <TabsTrigger value="shipments_staff">
              <p>Báo cáo giao hàng theo nhân viên</p>
            </TabsTrigger>
            <TabsTrigger value="shipments_partner">
              <p>Báo cáo giao hàng theo đối tác vận chuyển</p>
            </TabsTrigger>
            <TabsTrigger value="shipments_general">
              <p>Báo cáo giao hàng theo chi nhánh</p>
            </TabsTrigger>
            <TabsTrigger value="shipments_customer">
              <p>Báo cáo giao hàng theo khách hàng</p>
            </TabsTrigger>
          </TabsList>
        </CustomScrollbarTable>
        <TabsContent value="shipments_time">
          <ReportShipmentsByTime />
        </TabsContent>
        <TabsContent value="shipments_status">
          <ReportShipmentsByStatus />
        </TabsContent>
        <TabsContent value="shipments_staff">
          <ReportShipmentByStaff />
        </TabsContent>
        <TabsContent value="shipments_partner">
          <ReportShipmentByPartner />
        </TabsContent>
        <TabsContent value="shipments_general">
          <ReportShipmentByGeneral />
        </TabsContent>
        <TabsContent value="shipments_customer">
          <ReportShipmentByCustomer />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ViewReportShipments;
