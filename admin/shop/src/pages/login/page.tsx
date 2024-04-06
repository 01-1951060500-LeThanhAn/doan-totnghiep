import LoginForm from "@/components/form/form-login";

const LoginPage = () => {
  return (
    <>
      <div className="flex items-center w-full">
        <div className="w-2/5 flex flex-1 justify-center items-center min-h-[100vh]">
          <div className="">
            <img
              className="w-56 h-56 object-cover"
              src="https://res.cloudinary.com/dkw090gsn/image/upload/v1711269029/creative-abstract-modern-ecommerce-logo-design-colorful-gradient-online-shopping-logo-template_467913-985-removebg-preview_w7a6fl.png"
              alt=""
            />
            <LoginForm />
          </div>
        </div>
        <div className="w-3/5 flex flex-1 items-center justify-center bg-[#F5F4F7] min-h-[100vh]">
          <div>
            <img
              src="https://res.cloudinary.com/dkw090gsn/image/upload/v1711268000/Screenshot_2024-03-24_151133-removebg-preview_k81pnu.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
