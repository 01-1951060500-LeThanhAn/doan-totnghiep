import FormStaff from "../form-staff";

const FormAddStaff = () => {
  return (
    <FormStaff
      initialValues={{
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
