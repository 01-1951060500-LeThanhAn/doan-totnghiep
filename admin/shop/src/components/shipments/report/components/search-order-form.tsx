import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { searchOrders } from "@/api/orderApi";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { OrdersData } from "@/types/orders";

type Props = {
  setOrders: (orders: OrdersData[]) => void;
};

const SearchOrderForm = ({ setOrders }: Props) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const handleSearchOrder = async () => {
    try {
      const response = await searchOrders(startDate, endDate);
      setOrders(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Từ ngày</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="col-span-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Đến ngày</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="col-span-1">
          <Button onClick={handleSearchOrder} className="w-full">
            <p>Tìm kiếm</p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchOrderForm;
