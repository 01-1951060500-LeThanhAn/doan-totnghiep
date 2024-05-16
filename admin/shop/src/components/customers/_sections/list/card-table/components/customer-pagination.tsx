import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  startIndex: number;
  setStartIndex: (startIndex: number) => void;
  endIndex: number;
  setEndIndex: (endIndex: number) => void;
};

export default function CustomerPagination({
  startIndex,
  endIndex,
  setEndIndex,
  setStartIndex,
}: Props) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              startIndex === 0 ? "pointer-events-none opacity-50" : undefined
            }
            onClick={() => {
              setStartIndex(startIndex - 4);
              setEndIndex(endIndex - 4);
            }}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            className={
              endIndex === 100 ? "pointer-events-none opacity-50" : undefined
            }
            onClick={() => {
              setStartIndex(startIndex + 4);
              setEndIndex(endIndex + 4);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
