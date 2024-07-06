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
          transport_status: "",
          received_date: "",
          total_ship: "",
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
