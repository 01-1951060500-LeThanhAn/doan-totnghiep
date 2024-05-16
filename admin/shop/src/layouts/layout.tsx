import Sidebar from "@/components/sidebar/sidebar";

export default function DashBoardLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className="flex h-screen  flex-col md:flex-row md:overflow-hidden">
      <div className="w-20 flex-none lg:w-64 md:border-r">
        <Sidebar />
      </div>

      <div
        className={`flex-grow  z-10  mx-auto mt-0 md:mt-0  max-w-7xl flex-1 w-full overflow-y-scroll ${className}`}
      >
        {children}
      </div>
    </main>
  );
}
