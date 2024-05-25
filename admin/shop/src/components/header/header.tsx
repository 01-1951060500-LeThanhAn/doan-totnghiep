import { useAppSelector } from "@/hooks/hooks";

const Header = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <>
      <div className="flex justify-between flex-wrap space-y-3 items-center">
        <div className="">
          <header className="text-slate-600 text-xl mb-2 md:mb-0">
            Hello, {currentUser?.username}
          </header>
          <p className="text-2xl font-bold">
            Công ty dịch vụ nguyên phụ liệu may mặc An Việt
          </p>
        </div>
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="https://cdn.football365.fr/wp-content/uploads/se/2018/05/realmadrid_ronaldo-374x243.jpg"
            alt=""
          />
          <div className="ml-2">
            <p className="text-base font-semibold">{currentUser?.username}</p>
            <span className="text-sm text-slate-400">Admin</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
