import * as React from "react";

import { LuMoreHorizontal } from "react-icons/lu";

import { cn } from "@/utils";

import { buttonStyles } from "../Button";
import { usePaginationRange } from "./use-pagination-range";

type PaginationContextType = {
  paginationRange: number[];
  currentPage: number;
  prevEllipsisActive: boolean;
  nextEllipsisActive: boolean;
  setPage: (page: number) => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
};

const PaginationContext = React.createContext<
  PaginationContextType | undefined
>(undefined);

type PaginationProps = {
  totalPages: number;
  itemsPerPage: number;
  children: React.ReactNode;
  currentPage?: number; // Controlled state
  onChangePage?: (page: number) => void; // Callback for controlled state
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  itemsPerPage,
  children,
  currentPage: propsCurrentPage,
  onChangePage,
}) => {
  const [internalCurrentPage, setInternalCurrentPage] =
    React.useState<number>(1);

  const isControlled = propsCurrentPage !== undefined;
  const currentPage = isControlled ? propsCurrentPage : internalCurrentPage;

  const paginationRange = usePaginationRange({
    currentPage,
    itemsPerPage,
    totalPages,
  });

  const setPage = (page: number) => {
    if (isControlled && onChangePage) {
      onChangePage(page);
    } else {
      setInternalCurrentPage(page);
    }
  };

  const goToPreviousPage = () => setPage(Math.max(currentPage - 1, 1));

  const goToNextPage = () =>
    setPage(Math.min(currentPage + 1, Math.ceil(totalPages / itemsPerPage)));

  React.useEffect(() => {
    if (!isControlled && propsCurrentPage !== undefined) {
      setInternalCurrentPage(propsCurrentPage);
    }
  }, [propsCurrentPage, isControlled]);

  return (
    <PaginationContext.Provider
      value={{
        paginationRange: paginationRange.range,
        currentPage,
        prevEllipsisActive: paginationRange.prevEllipsisActive,
        nextEllipsisActive: paginationRange.nextEllipsisActive,
        setPage,
        goToPreviousPage,
        goToNextPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

const usePagination = (): PaginationContextType => {
  const context = React.useContext(PaginationContext);
  if (context === undefined) {
    throw new Error(
      "usePaginationContext must be used within a PaginationProvider",
    );
  }
  return context;
};

const PaginationContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"nav">
>(({ className, ...props }, ref) => (
  <nav
    className={cn("flex items-center gap-2", className)}
    {...props}
    ref={ref}
  />
));

PaginationContent.displayName = "PaginationContent";

const PaginationList = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => {
  const { currentPage, setPage, paginationRange } = usePagination();

  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
      ref={ref}
    >
      {paginationRange.map((page, index) => (
        <li key={index} onClick={() => setPage(page)}>
          <button
            className={cn(
              buttonStyles({
                variant: page === currentPage ? "outline" : "ghost",
                size: "icon",
              }),
            )}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
});

PaginationList.displayName = "PaginationList";

const PaginationPreviousButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { goToPreviousPage } = usePagination();

  return (
    <button
      onClick={goToPreviousPage}
      className={cn(
        buttonStyles({
          variant: "ghost",
          size: "md",
        }),
        "gap-1 pl-2.5 font-medium",
        className,
      )}
      {...props}
      ref={ref}
    />
  );
});

PaginationPreviousButton.displayName = "PaginationPreviousButton";

const PaginationNextButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { goToNextPage } = usePagination();

  return (
    <button
      onClick={goToNextPage}
      className={cn(
        buttonStyles({
          variant: "ghost",
          size: "md",
        }),
        "gap-1 pl-2.5 font-medium",
        className,
      )}
      {...props}
      ref={ref}
    />
  );
});

PaginationNextButton.displayName = "PaginationNextButton";

const PaginationPreviousEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => {
  const { prevEllipsisActive } = usePagination();

  if (!prevEllipsisActive) return;

  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <LuMoreHorizontal className="h-4 w-4" />
    </span>
  );
};

const PaginationNextEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => {
  const { nextEllipsisActive } = usePagination();

  if (!nextEllipsisActive) return;

  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <LuMoreHorizontal className="h-4 w-4" />
    </span>
  );
};

export {
  Pagination,
  PaginationContent,
  PaginationList,
  PaginationNextButton,
  PaginationNextEllipsis,
  PaginationPreviousButton,
  PaginationPreviousEllipsis,
  usePagination,
};
