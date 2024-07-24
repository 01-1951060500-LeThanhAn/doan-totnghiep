import FormCustomer from "../form-customer";

const FormAddCustomer = () => {
  return (
    <>
      <FormCustomer
        initialValues={{
          _id: "",
          username: "",
          email: "",
          birth: "",
          website: "",
          code: "",
          type: "",
          city: "",

          specific_address: "",
          level: "",
          phone: "",
          tax_code: "",
          note: "",
        }}
      />
    </>
  );
};

export default FormAddCustomer;
