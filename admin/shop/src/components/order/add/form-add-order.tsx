import FormOrder from "../form-order";

const FormAddOrder = () => {
  return (
    <>
      <FormOrder
        initialValues={{
          _id: "",
          code: "",
          userId: "",
          generalId: "",
          delivery_address: "",
          invoice_address: "",
          customerId: "",
          partnerId: "",
          payment_method: "",
          received_date: "",
          products: [
            {
              productId: "",
              quantity: 0,
            },
          ],
        }}
      />
    </>
  );
};

export default FormAddOrder;
