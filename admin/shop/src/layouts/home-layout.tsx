import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const HomeLayout = ({ children, className }: Props) => {
  return (
    <div className={` xl:mx-6 md:mx-6 mx-6 mt-4 ${className}`}>{children}</div>
  );
};

export default HomeLayout;
