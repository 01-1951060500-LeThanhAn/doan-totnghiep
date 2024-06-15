import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Upload, X } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  setFile: (file: File | null) => void;
  name: string;
};

const FormUpload = ({ setFile, name }: Props) => {
  const { theme } = useTheme();
  const { control } = useFormContext();
  const [filePreview, setFilePreview] = useState<string | null>();
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileImg = (e.target.files as FileList)[0];
    if (!fileImg) return;

    if (fileImg.size / 1000000 > 30) {
      return toast.error("Your file cannot exceed 30MB");
    }

    const preview = URL.createObjectURL(fileImg);

    setFile(fileImg);
    setFilePreview(preview);
  };

  const handleDiscard = () => {
    setFile(null);
    setFilePreview(null);
  };

  useEffect(() => {
    return () => {
      filePreview && URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  return (
    <>
      <div className="relative">
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <p className="text-2xl font-semibold">Hình ảnh sản phẩm</p>
              </FormLabel>
              <FormControl>
                {!filePreview ? (
                  <>
                    <label htmlFor="upload">
                      <div
                        className={`h-80  rounded-lg w-full mt-4  ${
                          theme === "light"
                            ? "border-[1px] border-[#342727] border-dashed"
                            : "bg-[#020817] hover:bg-[#020818c7]"
                        }`}
                      >
                        <div className="flex  flex-col h-full justify-center items-center">
                          <div className="bg-[#d0caca]  p-3 rounded-full">
                            <Upload />
                          </div>
                          <p className="mt-2">Add Photos</p>
                          <span className="text-slate-400 text-sm">
                            or drag and drop
                          </span>
                        </div>
                      </div>
                    </label>

                    <div className="my-3">
                      <input
                        {...field}
                        onChange={handleChangeFile}
                        type="file"
                        id="upload"
                        hidden
                        accept=".jpg, .png, .jpeg"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      onClick={handleDiscard}
                      className="absolute cursor-pointer top-0 right-0 z-50"
                    >
                      <X />
                    </div>
                    <div className="max-h-96 overflow-y-scroll w-full mt-4 bg-slate-600">
                      <img
                        className="h-full  w-full"
                        src={filePreview}
                        alt=""
                      />
                    </div>
                  </>
                )}
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default FormUpload;
