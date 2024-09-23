import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import {
  Pagination,
  PaginationContent,
  PaginationList,
  PaginationNextButton,
  PaginationNextEllipsis,
  PaginationPreviousButton,
  PaginationPreviousEllipsis,
} from "@/mijn-ui/components/Pagination";

type TablePaginationProps = {
  total?: number;
  itemsPerPage: number;
  currentPage: number;
  onChangePage: (page: number) => void;
};

const TablePaginator = ({
  total,
  itemsPerPage,
  currentPage,
  onChangePage,
}: TablePaginationProps) => {
  return (
    <Pagination
      totalPages={total || 0}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      onChangePage={onChangePage}
    >
      <PaginationContent>
        <PaginationPreviousButton>
          <LuChevronLeft className="h-4 w-4" />
          <span className="hidden sm:block">Previous</span>
        </PaginationPreviousButton>
        <PaginationPreviousEllipsis />
        <PaginationList />
        <PaginationNextEllipsis />
        <PaginationNextButton>
          <span className="hidden sm:block">Next</span>
          <LuChevronRight className="h-4 w-4" />
        </PaginationNextButton>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePaginator;
