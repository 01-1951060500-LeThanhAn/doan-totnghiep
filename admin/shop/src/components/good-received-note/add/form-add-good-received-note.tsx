import FormGoodReceivedNote from "../form-good-received-note";

const FormAddGoodReceivedNotePage = () => {
  return (
    <>
      <FormGoodReceivedNote
        initialValues={{
          manager: "",
          _id: "",
          payment_method: "",
          payment_status: "",
          code: "",
          delivery_date: "",
          generalId: "",
          supplierId: "",
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

export default FormAddGoodReceivedNotePage;
