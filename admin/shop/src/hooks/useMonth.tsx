import { useState } from "react";

export const useMonths = () => {
  const [months] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);

  return months;
};
