import FormSupplierReceipt from "../form-receipt-suppliers";

const FormAddReceiptSuppliers = () => {
  return (
    <>
      <FormSupplierReceipt
        initialValues={{
          code: "",
          submitter: "",
          staffId: "",
          supplierId: "",
          desc: "",
          products: [
            {
              totalPrice: 0,
              warehouseId: "",
            },
          ],
          receipt_type: "",
          payment_method: "",
        }}
      />
    </>
  );
};

export default FormAddReceiptSuppliers;
