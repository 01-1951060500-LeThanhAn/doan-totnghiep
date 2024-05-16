import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

export function CustomSkeleton() {
  const { theme } = useTheme();
  return (
    <div className="flex flex-grow space-y-3 overflow-hidden">
      <div className="space-y-2">
        <Skeleton
          className={`h-8 w-[1200px] ${
            theme === "dark" ? "bg-[#29343F]" : "bg-[#d3dbe3]"
          } `}
        />
        <Skeleton
          className={`h-8 w-[1200px] ${
            theme === "dark" ? "bg-[#29343F]" : "bg-[#d3dbe3]"
          } `}
        />
        <Skeleton
          className={`h-8 w-[1200px] ${
            theme === "dark" ? "bg-[#29343F]" : "bg-[#d3dbe3]"
          } `}
        />
      </div>
    </div>
  );
}
