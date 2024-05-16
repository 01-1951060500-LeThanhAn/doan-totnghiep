import FormPartner from "../form-partner";

const FormAddPartner = () => {
  return (
    <>
      <FormPartner
        initialValues={{
          _id: "",
          username: "",
          code: "",
          phone: "",
          email: "",
          address: "",
          staffIncharge: "",
          payer: "",
          status: "",
        }}
      />
    </>
  );
};

export default FormAddPartner;
