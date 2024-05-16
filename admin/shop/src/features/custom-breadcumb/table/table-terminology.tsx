import "handsontable/dist/handsontable.full.min.css";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";

registerAllModules();

const TableTerminology = () => {
  const data = [
    {
      name: "Nợ đầu kỳ",
      note: "Công nợ khách hàng tính đến hết ngày trước ngày chọn đầu tiên xem báo cáo công nợ. Nợ đầu kỳ dương là khách đang nợ cửa hàng, Nợ đầu kỳ âm là cửa hàng đang nợ khách",
    },
    {
      name: "Nợ tăng trong kỳ",
      note: "Tổng giá trị giao dịch làm tăng công nợ của khách hàng trong khoảng thời gian ghi nhận: Tiền khách phải trả khi đơn giao thành công, Giá trị phiếu chi tạo cho khách hàng Giá trị hoàn trả khách khi trả hàng",
    },
    {
      name: "Nợ giảm trong kỳ",
      note: "Tổng giá trị giao dịch làm giảm công nợ khách hàng trong khoảng thời gian ghi nhận: Giá trị phiếu thu bao gồm thanh toán cho đơn hàng và phiếu thu tạo thủ công cho khách hàng, Giá trị hàng khách trả lại Giá trị đơn hàng huỷ",
    },
    {
      name: "Nợ còn trong kỳ",
      note: "Nợ còn trong kỳ = Nợ tăng trong kỳ - Nợ giảm trong kỳ",
    },
    { name: "Nợ cuối kỳ", note: "Nợ cuối kỳ = Nợ đầu kỳ + Nợ còn trong kỳ" },
  ];

  const customHeaders = ["Thuật ngữ", "Y nghĩa"];

  const columns = [
    { data: "name", header: customHeaders[0] },
    { data: "note", header: customHeaders[1] },
  ];

  return (
    <HotTable
      data={data}
      width="auto"
      height="auto"
      colHeaders={customHeaders}
      autoWrapRow={true}
      columns={columns}
      autoWrapCol={true}
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

export default TableTerminology;
