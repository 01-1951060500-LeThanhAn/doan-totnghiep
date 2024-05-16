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
          totalPrice: "",
          orderId: "",
          receipt_type: "",
          payment_method: "",
        }}
      />
    </>
  );
};

export default FormAddCustomerReceipt;
