import FormStaff from "../form-staff";

const FormAddStaff = () => {
  return (
    <FormStaff
      initialValues={{
        address: "",
        phone: "",
        _id: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      }}
    />
  );
};

export default FormAddStaff;
