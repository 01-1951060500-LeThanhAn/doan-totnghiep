import { useAppSelector } from "@/hooks/hooks";

const Header = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="">
          <header className="text-slate-600">Hello, Thanh An</header>
          <p className="text-3xl font-bold">Welcome to admin dashboard </p>
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
