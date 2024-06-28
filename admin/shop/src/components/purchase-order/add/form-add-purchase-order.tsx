import FormPurchaseOrder from "../form-purchase-order";

const FormAddPurchaseOrder = () => {
  return (
    <>
      <FormPurchaseOrder
        initialValues={{
          _id: "",
          payment_status: "",
          order_status: "",
          code: "",
          received_date: "",
          generalId: "",
          supplierId: "",
          staffId: "",
          products: [
            {
              inventory_number: 0,
              productId: "",
              import_price: "",
            },
          ],
        }}
      />
    </>
  );
};

export default FormAddPurchaseOrder;
