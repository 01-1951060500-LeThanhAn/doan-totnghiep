import { useTheme } from "next-themes";
import ListNavLinks from "./list-navlink";
import MoredropDown from "./more-dropdown";

const Sidebar = () => {
  const { theme } = useTheme();
  return (
    <>
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <div>
          {theme === "dark" ? (
            <img
              className="w-auto mb-3 h-auto object-contain hidden lg:block"
              src="https://res.cloudinary.com/dhwufmyi4/image/upload/v1716081197/Screenshot_2024-05-19_081152-removebg-preview_ivorbl.png"
              alt=""
            />
          ) : (
            <img
              className="w-auto mb-6 h-auto object-contain hidden lg:block"
              src="https://res.cloudinary.com/dhwufmyi4/image/upload/v1715327201/Screenshot_2024-05-10_144404-removebg-preview_cpu2ap.png"
              alt=""
            />
          )}
        </div>
        <div
          className="border-t flex-1 mb-2 w-full md:relative md:h-full bottom-0 md:border-none flex
         flex-row md:justify-between space-x-2 md:flex-col
          md:space-x-0 -ml-3 bg-white dark:bg-[#020817] justify-evenly fixed
           z-50 md:ml-0 "
        >
          <ListNavLinks />

          <div className=" md:flex relative md:mt-auto flex-1 items-end w-full">
            <MoredropDown />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
