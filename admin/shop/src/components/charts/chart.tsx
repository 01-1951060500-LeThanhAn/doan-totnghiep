import { adminApi } from "@/api";
import { useEffect, useState } from "react";
import UserChart from "./user-chart";
import IncomeChart from "./income-chart";
import StatusChart from "./status-product-chart";
import { useMonths } from "@/hooks/useMonth";
import { useStatus } from "@/hooks/useStatus";
import { Data, StatusData } from "@/types";
import { useTheme } from "next-themes";

const Chart = () => {
  const [userActive, setUserActive] = useState([]);
  const [income, setIncome] = useState([]);
  const [status, setStatus] = useState([]);
  const months = useMonths();
  const statusProducts = useStatus();
  const { theme } = useTheme();

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await adminApi.get("/users/stats");
        const data = res.data.map((item: Data) => ({
          name: months[item._id - 1],
          "Active User": item.total,
        }));
        setUserActive(data);
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [months]);

  useEffect(() => {
    const getProductStats = async () => {
      try {
        const res = await adminApi.get("/order/income");

        const data = res.data.map((item: Data) => ({
          name: months[item._id - 1],
          "Total orders Products": item.total,
        }));
        setIncome(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductStats();
  }, [months]);

  useEffect(() => {
    const getStatusProducts = async () => {
      try {
        const res = await adminApi.get("/order/status");

        const data = res.data.map((item: StatusData, index: number) => ({
          name: statusProducts[index],
          value: item.count,
        }));
        setStatus(data);
      } catch (error) {
        console.log(error);
      }
    };
    getStatusProducts();
  }, [statusProducts]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-flow-row-dense lg:grid-cols-3 gap-x-3 lg:grid-template-rows-[auto 1fr auto]">
        <div
          className={`rounded-xl mb-4 lg:mb-0 min-h-80 shadow-md py-3 lg:col-span-2 ${
            theme === "dark" ? "bg-[#212B36]" : ""
          }`}
        >
          <IncomeChart
            data={income}
            title="Products Income"
            dataKey="Total orders Products"
          />
        </div>
        <div
          className={`rounded-xl mb-4 lg:mb-0 shadow-md py-3 my-3 md:my-0 ${
            theme === "dark" ? "bg-[#212B36]" : ""
          } `}
        >
          <StatusChart
            data={status}
            title="Products Status"
            dataKey="Status Products total"
          />
        </div>
        <div className="lg:col-span-3 my-1 lg:my-4">
          <div
            className={`rounded-xl mt-3 lg:mt-0 shadow-md py-2 ${
              theme === "dark" ? "bg-[#212B36]" : ""
            }`}
          >
            <UserChart
              data={userActive}
              title="User Analytics"
              dataKey="Active User"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
