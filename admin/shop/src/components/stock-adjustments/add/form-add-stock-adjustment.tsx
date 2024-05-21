import FormStockAdjustment from "../form-stock-adjustment";

const FormAddStockAdjustment = () => {
  return (
    <>
      <FormStockAdjustment
        initialValues={{
          _id: "",
          code: "",
          desc: "",
          products: [
            {
              inventory_number: 0,
              reason: "",
              productId: "",
            },
          ],
          stocktaking_day: "",
          staffId: "",
          generalId: "",
        }}
      />
    </>
  );
};

export default FormAddStockAdjustment;
