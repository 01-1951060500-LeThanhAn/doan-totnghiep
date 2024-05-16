import { getDetailDeliveryNote } from "@/api/deliveryNoteApi";
import { DetailDeliveryNoteData } from "@/types/delivery_note";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const useGetDetailDeliveryNote = ({ id }: Props) => {
  const [deliveryNote, setDeliveryNote] = useState<DetailDeliveryNoteData>();

  useEffect(() => {
    const fetchDetailDeliveryNote = async () => {
      const response = await getDetailDeliveryNote(id);

      setDeliveryNote(response.data);
    };

    fetchDetailDeliveryNote();
  }, [id]);

  return { deliveryNote };
};

export default useGetDetailDeliveryNote;
