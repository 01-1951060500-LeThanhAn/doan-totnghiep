export const formatPrice = (data: number) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  }).format(data);

  return formatted;
};
