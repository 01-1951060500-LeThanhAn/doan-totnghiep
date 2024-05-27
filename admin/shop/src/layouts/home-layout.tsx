import React from "react";
type Props = {
  children: React.ReactNode;
  className?: string;
};

const HomeLayout = ({ children, className }: Props) => {
  return (
    <div className={` xl:mx-6 md:mx-6 mx-6 md:mt-4 mt-0 ${className}`}>
      {children}
    </div>
  );
};

export default HomeLayout;
