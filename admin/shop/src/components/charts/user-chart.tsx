import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  Legend,
} from "recharts";

type Props = {
  data: never[];
  title?: string;
  dataKey?: string;
};

const UserChart = ({ data, dataKey }: Props) => {
  return (
    <>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart
          height={600}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" stroke="#5550bd" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />

          <CartesianGrid stroke="#e0dfdf" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default UserChart;
