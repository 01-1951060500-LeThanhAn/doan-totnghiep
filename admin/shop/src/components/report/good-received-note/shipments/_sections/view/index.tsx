import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomScrollbarTable from "@/features/custom-scrollbar";
import ReportShipmentGrnByTime from "../components/shipment_time";
import ReportShipmentGrnByMethod from "../components/shipment_method";

const ViewReportShipmentGrn = () => {
  return (
    <>
      <Tabs defaultValue="shipments">
        <CustomScrollbarTable className="mb-3">
          <div className="">
            <TabsList className="mx-6 mt-4">
              <TabsTrigger value="shipments">
                <p>Báo cáo thanh toán nhập kho theo thời gian</p>
              </TabsTrigger>

              <TabsTrigger value="shipments_method">
                <p>Báo cáo thanh toán nhập kho theo phương thức </p>
              </TabsTrigger>
            </TabsList>
          </div>
        </CustomScrollbarTable>
        <TabsContent value="shipments">
          <ReportShipmentGrnByTime />
        </TabsContent>

        <TabsContent value="shipments_method">
          <ReportShipmentGrnByMethod />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ViewReportShipmentGrn;
