import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const HomeLayout = ({ children, className }: Props) => {
  return <div className={`mx-2 md:mx-0 ${className}`}>{children}</div>;
};

export default HomeLayout;
