export const formatPrice = (data: number) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(data);

  return formatted;
};
