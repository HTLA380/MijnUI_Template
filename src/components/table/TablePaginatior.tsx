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
        <PaginationPreviousButton className="size-8 p-0 text-sm md:h-9 md:w-auto md:px-2 md:py-3">
          <LuChevronLeft className="h-4 w-4" />
          <span className="hidden md:block">Previous</span>
        </PaginationPreviousButton>
        <PaginationPreviousEllipsis />
        <PaginationList className="[&>li>button]:size-9 [&>li>button]:text-xs [&>li>button]:md:size-10 [&>li>button]:md:text-sm" />
        <PaginationNextEllipsis />
        <PaginationNextButton className="size-9 p-0 text-sm md:h-9 md:w-auto md:px-2 md:py-3">
          <span className="hidden md:block">Next</span>
          <LuChevronRight className="h-4 w-4" />
        </PaginationNextButton>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePaginator;
