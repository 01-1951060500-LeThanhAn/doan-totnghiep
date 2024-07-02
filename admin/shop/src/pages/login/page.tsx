import LoginForm from "@/components/auth/form/form-login";
import "./login.css";
const LoginPage = () => {
  return (
    <>
      <div
        style={{
          background: `url("https://res.cloudinary.com/dhwufmyi4/image/upload/v1719147372/Screenshot_2024-06-23_194320_1_cx6xqj.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
          position: "relative",
        }}
      >
        <div className="absolute top-0 right-0 left-0 bottom-0 w-full h-full bg-[rgba(0,0,0,0.4)]">
          <div className=" text-center w-full">
            <p className="text-4xl mt-12 title -mb-20 text-white font-bold">
              CÔNG TY QUẢN LÝ NGUYÊN PHỤ LIỆU MAY MẶC AN VIỆT
            </p>
          </div>
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
        </div>
      </div>
    </>
  );
};

export default LoginPage;
