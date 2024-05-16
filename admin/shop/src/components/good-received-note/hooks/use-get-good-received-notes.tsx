import { getGoodReceivedNote } from "@/api/grnApi";
import { GoodReceivedNoteData } from "@/types/good_received_note";
import { useEffect, useState } from "react";

const useGetGoodReceivedNotes = () => {
  const [goodReceivedNotes, setGoodReceivedNotes] = useState<
    GoodReceivedNoteData[]
  >([]);

  useEffect(() => {
    const fetchGoodReceivedNotes = async () => {
      const response = await getGoodReceivedNote();

      setGoodReceivedNotes(response.data);
    };

    fetchGoodReceivedNotes();
  }, []);

  return { goodReceivedNotes };
};

export default useGetGoodReceivedNotes;
