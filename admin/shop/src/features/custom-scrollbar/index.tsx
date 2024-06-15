import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const CustomScrollbarTable = ({ children, className }: Props) => {
  return (
    <ScrollArea
      className={`w-full whitespace-nowrap mb-14 lg:mb-0 rounded-md ${className}`}
    >
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CustomScrollbarTable;
