import FormGeneral from "../form-general";

const FormAddGeneral = () => {
  return (
    <FormGeneral
      initialValues={{
        _id: "",
        name: "",
        address: "",
        type: "",
        code: "",
        manager: "",
      }}
    />
  );
};

export default FormAddGeneral;
