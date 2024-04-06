import FormProduct from "../fom-product";

const FormAddProduct = () => {
  return (
    <>
      <FormProduct
        initialValues={{
          title: "",
          desc: "",
          img: "",
          ram: [],
          ssd: [],
          type: "",
          price: 0,
          operator_system: "",
          cpu: "",
          gpu: "",
          screen: "",
          webcam: "",
          connector: "",
          design: "",
          performance: "",
        }}
      />
    </>
  );
};

export default FormAddProduct;
