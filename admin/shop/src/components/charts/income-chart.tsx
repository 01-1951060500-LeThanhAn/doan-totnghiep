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
  data: never[];
  title?: string;
  dataKey?: string;
};

export default function IncomeChart({ data, dataKey }: Props) {
  return (
    <ResponsiveContainer width="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey!} stackId="a" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
