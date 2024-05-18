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
        generalId: "",
      }}
    />
  );
};

export default FormAddStaff;
