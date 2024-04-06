import { SearchFormData, formSearchSchema } from "@/actions/searchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { CircleX, SearchIcon } from "lucide-react";
import { useEffect } from "react";
type Props = {
  onSubmit: (formData: SearchFormData) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};

const Search = ({ onSubmit, placeHolder, onReset, searchQuery }: Props) => {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(formSearchSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex  items-center gap-3 py-3 justify-between flex-row border-2 rounded-lg px-2 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <input
                  {...field}
                  className="rounded-lg border-none px-2  w-full h-full outline-none  text-base focus-visible:ring-0"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {form.formState.isDirty && (
          <div onClick={handleReset} className="cursor-pointer z-50">
            <CircleX size={20} />
          </div>
        )}
        <button
          type="submit"
          className="rounded-full z-50 bg-white hover:bg-white"
        >
          <SearchIcon
            strokeWidth={2.5}
            size={20}
            className="ml-1 text-black "
          />
        </button>
      </form>
    </Form>
  );
};

export default Search;
