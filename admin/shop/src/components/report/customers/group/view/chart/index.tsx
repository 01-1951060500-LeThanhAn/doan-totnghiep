import { ReportCustomerByLocation } from "@/types/report";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
type Props = {
  data: ReportCustomerByLocation[];
  title: string;
  dataKey: string;
  grid: boolean;
};

const ChartReportCustomerByGroup = ({ data }: Props) => {
  return (
    <>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="Số lượng khách hàng" stackId="b" fill="#82ca9d" />
          <Bar dataKey="Số lượng đơn hàng" stackId="c" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ChartReportCustomerByGroup;
