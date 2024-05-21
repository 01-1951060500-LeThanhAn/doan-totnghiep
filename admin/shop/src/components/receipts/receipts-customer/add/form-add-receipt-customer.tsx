import FormCustomerReceipt from "../form-receipt-customer";

const FormAddCustomerReceipt = () => {
  return (
    <>
      <FormCustomerReceipt
        initialValues={{
          _id: "",
          code: "",
          submitter: "",
          staffId: "",
          customerId: "",
          desc: "",
          products: [
            {
              orderId: "",
              totalPrice: 0,
            },
          ],
          receipt_type: "",
          payment_method: "",
        }}
      />
    </>
  );
};

export default FormAddCustomerReceipt;
