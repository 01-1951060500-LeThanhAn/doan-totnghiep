import { Custombreadcumb } from "@/features/custom-breadcumb";
import Header from "../header";
import GeneralView from "./_sections";

const GeneralMain = () => {
  return (
    <>
      <Header text1="Kho" text2="Quản lý kho" title="Kho" />
      <Custombreadcumb
        href2="/dashboard/management/general"
        breadcumbItem="Kho"
        breadcumbPage="Quản lý kho"
      />

      <GeneralView />
    </>
  );
};

export default GeneralMain;
