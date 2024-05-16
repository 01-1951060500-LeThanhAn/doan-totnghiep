import { getDetailGoodReceivedNote } from "@/api/grnApi";
import { DetailGoodReceivedNote } from "@/types/good_received_note";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const useGetDetailGoodReceivedNote = ({ id }: Props) => {
  const [goodReceivedNote, setGoodReceivedNote] =
    useState<DetailGoodReceivedNote>();
  useEffect(() => {
    const fetchDetailGoodReceivedNote = async () => {
      const response = await getDetailGoodReceivedNote(id);

      setGoodReceivedNote(response.data);
    };

    fetchDetailGoodReceivedNote();
  }, [id]);
  return { goodReceivedNote };
};

export default useGetDetailGoodReceivedNote;
