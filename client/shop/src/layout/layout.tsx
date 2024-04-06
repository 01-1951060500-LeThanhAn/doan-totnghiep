import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};
const MainLayout = ({ children, className }: Props) => {
  return (
    <>
      <div className={` mx-[2%] md:mx-[5%] xl:mx-[10%] ${className}`}>
        {children}
      </div>
    </>
  );
};

export default MainLayout;
