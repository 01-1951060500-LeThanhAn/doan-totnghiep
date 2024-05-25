import { ReportCustomer } from "@/types/report";
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
  title: string;
  dataKey: string;
  data: ReportCustomer[];
  grid: boolean;
};

const ChartReportCustomer = ({ title, dataKey, data, grid }: Props) => {
  return (
    <>
      <p className="text-center text-base ">{title}</p>
      <ResponsiveContainer aspect={4 / 1}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 40,
            right: 50,
            left: 10,
            bottom: 5,
          }}
        >
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}

          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} stackId="a" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ChartReportCustomer;
