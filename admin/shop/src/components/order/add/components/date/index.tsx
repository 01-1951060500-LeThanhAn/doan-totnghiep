import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  field: ControllerRenderProps<FieldValues, "received_date">;
};

export function DateInputData({ field }: Props) {
  function handleDateChange(date: Date | undefined) {
    field.onChange(date);
  }

  function formatDate(date: Date | null): string {
    if (!date) return "";
    return format(date, "PPP");
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !field?.value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {field?.value ? (
            <p>{formatDate(field?.value)}</p>
          ) : (
            <span>Chọn ngày</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
