import { TableCell, TableRow } from "@mijn-ui/components/table";

/* -------------------------------------------------------------------------- */

const TableRowSkeleton = () => {
  return (
    <TableRow className="relative h-14 border-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-main-border">
      <TableCell>
        <div className="size-5 animate-pulse rounded-default bg-neutral"></div>
      </TableCell>

      <TableCell className="w-44">
        <div className="flex items-center gap-2">
          <div className="size-10 animate-pulse rounded-full bg-neutral"></div>
          <div>
            <div className="w-44 animate-pulse rounded-full bg-neutral py-2"></div>
            <div className="mt-1 w-3/4 animate-pulse rounded-full bg-neutral py-1.5"></div>
          </div>
        </div>
      </TableCell>

      <TableCell className="w-full min-w-44">
        <div className="w-44 animate-pulse rounded-full bg-neutral py-2"></div>
      </TableCell>

      <TableCell className="w-full min-w-44">
        <div className="w-44 animate-pulse rounded-full bg-neutral py-2"></div>
        <div className="mt-1 w-3/4 animate-pulse rounded-full bg-neutral py-1.5"></div>
      </TableCell>

      <TableCell className="min-w-32">
        <div className="text-sm">
          <div className="w-full animate-pulse rounded-full bg-neutral py-2"></div>
          <div className="mt-1 w-3/4 animate-pulse rounded-full bg-neutral py-1.5"></div>
        </div>
      </TableCell>

      <TableCell className="hidden w-full min-w-44 sm:table-cell">
        <div className="w-44 animate-pulse rounded-full bg-neutral py-2"></div>
        <div className="mt-1 w-3/4 animate-pulse rounded-full bg-neutral py-1.5"></div>
      </TableCell>

      <TableCell className="min-w-24">
        <div className="w-24 animate-pulse rounded-full bg-neutral py-2"></div>
      </TableCell>

      <TableCell className="hidden min-w-44 sm:table-cell">
        <p className="w-44 animate-pulse rounded-full bg-neutral py-2"></p>
      </TableCell>

      <TableCell className="min-w-24">
        <div className="text-neutral-neutral flex items-center gap-2 text-xs">
          <div
            className={
              "ring-neutral-neutral h-2 w-2 animate-pulse rounded-full bg-neutral ring-2"
            }
          />
          <div className="w-full animate-pulse rounded-full bg-neutral py-2"></div>
        </div>
      </TableCell>

      <TableCell className="sticky right-0 top-0 w-14 bg-surface/10 backdrop-blur">
        <div className="h-10 animate-pulse rounded-full bg-neutral px-1"></div>
      </TableCell>
    </TableRow>
  );
};

export default TableRowSkeleton;
