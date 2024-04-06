import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type Props = {
  startIndex: number;
  setStartIndex: (startIndex: number) => void;
  endIndex: number;
  setEndIndex: (endIndex: number) => void;
  type: string;
};

export default function UserPagination({
  startIndex,
  endIndex,
  setEndIndex,
  setStartIndex,
  type,
}: Props) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {type === "products" ? (
            <Link to={`/dashboard/add-product`}>
              <Button>Add Product</Button>
            </Link>
          ) : (
            <Link to={`/dashboard/add-user`}>
              <Button>Add User</Button>
            </Link>
          )}
        </PaginationItem>
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
