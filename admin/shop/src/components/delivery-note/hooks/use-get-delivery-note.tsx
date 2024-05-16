import { getDeliveryNote } from "@/api/deliveryNoteApi";
import { DeliveryNoteData } from "@/types/delivery_note";
import { useEffect, useState } from "react";

const useGetDeliveryNote = () => {
  const [deliveryNotes, setDeliveryNotes] = useState<DeliveryNoteData[]>([]);

  useEffect(() => {
    const fetchDeliveryNotes = async () => {
      const response = await getDeliveryNote();

      setDeliveryNotes(response.data);
    };

    fetchDeliveryNotes();
  }, []);

  return { deliveryNotes };
};

export default useGetDeliveryNote;
