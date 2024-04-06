import { useState } from "react";

export const useStatus = () => {
  const [statusProducts] = useState([
    "Đã hủy",
    "Đang xử lý",
    "Đã giao",
    "Đang chờ thanh toán",
  ]);

  return statusProducts;
};
