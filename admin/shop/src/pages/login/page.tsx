import LoginForm from "@/components/auth/form/form-login";

const LoginPage = () => {
  return (
    <>
      <div className="flex items-center w-full">
        <div className="w-2/5 flex flex-1 justify-center items-center min-h-[100vh]">
          <div className="">
            <img
              className="w-64 h-64 object-cover"
              src="https://res.cloudinary.com/dhwufmyi4/image/upload/v1715153476/436749221_7771422172901509_7228334318994765128_n-removebg-preview_uyr5dn.png"
              alt=""
            />

            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
