import FormSupplier from "../form-supplier";

const FormAddSupplier = () => {
  return (
    <>
      <FormSupplier
        initialValues={{
          _id: "",
          supplier_name: "",
          supplier_code: "",
          phone: "",
          email_supplier: "",
          address_supplier: "",
          website: "",
          desc: "",
          tax_code: "",
          userId: "",
        }}
      />
    </>
  );
};

export default FormAddSupplier;
