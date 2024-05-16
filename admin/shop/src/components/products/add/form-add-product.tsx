import FormProduct from "../fom-product";

const FormAddProduct = () => {
  return (
    <>
      <FormProduct
        initialValues={{
          _id: "",
          name_product: "",
          desc: "",
          img: "",
          code: "",
          unit: "",
          type: "",
          import_price: "",
          export_price: "",
          inventory_number: 0,
          manager: "",
          generalId: "",
        }}
      />
    </>
  );
};

export default FormAddProduct;
