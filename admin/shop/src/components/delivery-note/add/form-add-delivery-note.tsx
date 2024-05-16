import FormDeliveryNote from "../form-delivery-note";

const FormAddDeliveryPage = () => {
  return (
    <>
      <FormDeliveryNote
        initialValues={{
          manager: "",
          _id: "",
          code: "",
          deliveryDate: "",
          transferDate: "",
          fromGeneralId: "",
          toGeneralId: "",
          status: "",
          products: [
            {
              inventory_number: 0,
              productId: "",
            },
          ],
        }}
      />
    </>
  );
};

export default FormAddDeliveryPage;
