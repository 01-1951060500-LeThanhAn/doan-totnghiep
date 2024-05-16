import FormCategory from "../form-category";

const FormAddCategoryPage = () => {
  return (
    <>
      <FormCategory
        initialValues={{
          _id: "",
          name: "",
          code: "",
          description: "",
          status: "",
        }}
      />
    </>
  );
};

export default FormAddCategoryPage;
