import { TableCell, TableRow } from "@/mijn-ui/components/Table/Table";

/* -------------------------------------------------------------------------- */

const CustomerRowSkeleton = () => {
  return (
    <TableRow className="relative h-14 border-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-main-border">
      <TableCell>
        <div className="size-5 animate-pulse rounded-default bg-muted"></div>
      </TableCell>

      <TableCell className="w-44">
        <div className="flex items-center gap-2">
          <div className="size-10 animate-pulse rounded-full bg-muted"></div>
          <div>
            <div className="w-44 animate-pulse rounded-full bg-muted py-2"></div>
            <div className="mt-1 w-3/4 animate-pulse rounded-full bg-muted py-1.5"></div>
          </div>
        </div>
      </TableCell>

      <TableCell className="w-full min-w-44">
        <div className="w-44 animate-pulse rounded-full bg-muted py-2"></div>
      </TableCell>

      <TableCell className="w-full min-w-44">
        <div className="w-44 animate-pulse rounded-full bg-muted py-2"></div>
        <div className="mt-1 w-3/4 animate-pulse rounded-full bg-muted py-1.5"></div>
      </TableCell>

      <TableCell className="min-w-32">
        <div className="text-sm">
          <div className="w-full animate-pulse rounded-full bg-muted py-2"></div>
          <div className="mt-1 w-3/4 animate-pulse rounded-full bg-muted py-1.5"></div>
        </div>
      </TableCell>

      <TableCell className="hidden w-full min-w-44 sm:table-cell">
        <div className="w-44 animate-pulse rounded-full bg-muted py-2"></div>
        <div className="mt-1 w-3/4 animate-pulse rounded-full bg-muted py-1.5"></div>
      </TableCell>

      <TableCell className="min-w-24">
        <div className="w-24 animate-pulse rounded-full bg-muted py-2"></div>
      </TableCell>

      <TableCell className="hidden min-w-44 sm:table-cell">
        <p className="w-44 animate-pulse rounded-full bg-muted py-2"></p>
      </TableCell>

      <TableCell className="min-w-24">
        <div className="flex items-center gap-2 text-xs text-muted-text">
          <div
            className={
              "h-2 w-2 animate-pulse rounded-full bg-muted ring-2 ring-muted-text"
            }
          />
          <div className="w-full animate-pulse rounded-full bg-muted py-2"></div>
        </div>
      </TableCell>

      <TableCell className="sticky right-0 top-0 w-14 bg-surface/10 backdrop-blur">
        <div className="h-10 animate-pulse rounded-full bg-muted px-1"></div>
      </TableCell>
    </TableRow>
  );
};

export default CustomerRowSkeleton;
