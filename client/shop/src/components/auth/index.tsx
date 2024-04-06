import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Form from "./login-or-register";

export default function Auth() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-sm cursor-pointer text-slate-500">Login</p>
      </DialogTrigger>
      <DialogContent className="pt-10 pb-6">
        <Form />
      </DialogContent>
    </Dialog>
  );
}
