import HomeLayout from "@/layouts/home-layout";
import SearchOrderForm from "./components/search-order-form";
import Heading from "./heading";
import { useState } from "react";
import { OrdersData } from "@/types/orders";
import ResultsOrders from "./components/results-orders";

const ReportOrderByDay = () => {
  const [orders, setOrders] = useState<OrdersData[]>([]);
  console.log(orders);
  return (
    <>
      <Heading />
      <HomeLayout>
        <SearchOrderForm setOrders={setOrders} />
      </HomeLayout>
      <ResultsOrders orders={orders as OrdersData[]} />
    </>
  );
};

export default ReportOrderByDay;
