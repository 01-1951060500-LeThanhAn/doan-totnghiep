import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const CustomScrollbarTable = ({ children }: Props) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap mb-12 lg:mb-0 rounded-md">
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CustomScrollbarTable;
