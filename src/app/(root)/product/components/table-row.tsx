import * as React from "react"
import Image from "next/image"
import { AlertDialogTrigger } from "@mijn-ui/components/alert-dialog"
import { Checkbox } from "@mijn-ui/components/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@mijn-ui/components/dropdown-menu"
import {
  TableRow as MijnUITableRow,
  TableCell,
} from "@mijn-ui/components/table"
import { cn } from "@mijn-ui/utils"
import { Product } from "../types"
import { FaEdit, FaEye, FaTrash } from "react-icons/fa"
import { LuMoreVertical } from "react-icons/lu"

/* -------------------------------------------------------------------------- */

type TableRowProps = {
  product: Product
  handleCheck: (id: number) => void
  selectedProductsId: number[]
}

const TableRow = ({
  product,
  handleCheck,
  selectedProductsId,
}: TableRowProps) => {
  const commonClasses = "w-full px-3 py-2 text-xs md:px-4 md:py-3 md:text-sm"

  const renderProduct = (
    <TableCell className={cn(commonClasses, "min-w-72")}>
      <div className="flex items-center gap-2">
        <Image
          width={40}
          height={40}
          draggable="false"
          className="size-10 rounded-full bg-neutral"
          // use the index 1 when the randomImageIndex is 0 since the image starts from 1
          src={product.thumbnail}
          alt={`product-${product.id}-image`}
        />
        <div>
          <p className="w-44 truncate">{product.title}</p>
        </div>
      </div>
    </TableCell>
  )

  const renderCheckbox = (
    <TableCell>
      <Checkbox
        className="size-[1.125rem] border-main-border md:size-5 [&+span>svg]:size-[0.7rem] md:[&+span>svg]:size-4"
        checked={selectedProductsId.includes(product.id)}
        onClick={(e) => e.stopPropagation()}
        onCheckedChange={() => handleCheck(product.id)}
      />
    </TableCell>
  )

  const renderCategory = (
    <TableCell className={cn(commonClasses, "md:min-w-16")}>
      <p className="capitalize md:w-44">{product.category}</p>
    </TableCell>
  )

  const renderStock = (
    <TableCell className={cn(commonClasses, "md:min-w-44 text-right")}>
      <p className="line-clamp-2 truncate md:min-w-44">{product.stock}</p>
    </TableCell>
  )

  const renderSKU = (
    <TableCell className={cn(commonClasses, "md:min-w-32")}>
      <div>
        <p>{product.sku}</p>
        {/* <p className="text-xs text-neutral-text">{randomDateAndTime.time}</p> */}
      </div>
    </TableCell>
  )

  const renderBrand = (
    <TableCell className={cn(commonClasses, "hidden min-w-44 sm:table-cell")}>
      <p className="truncate md:w-44">{product.brand}</p>
    </TableCell>
  )

  const renderSellingPrice = (
    <TableCell className={cn(commonClasses, "md:min-w-16 text-right")}>
      <p className="truncate md:w-32">{product.price}</p>
    </TableCell>
  )

  const renderDateAdded = (
    <TableCell className={cn(commonClasses, "hidden min-w-44 sm:table-cell")}>
      <p className="truncate md:w-44">
        {new Date(product.meta.createdAt).toLocaleString()}
      </p>
    </TableCell>
  )

  const renderDateUpdated = (
    <TableCell className={cn(commonClasses, "hidden min-w-44 sm:table-cell")}>
      <p className="truncate md:w-44">
        {new Date(product.meta.updatedAt).toLocaleString()}
      </p>
    </TableCell>
  )

  const renderAvailabilityStatus = (
    <TableCell className={cn(commonClasses, "md:min-w-44")}>
      <div className="flex items-center gap-2 text-xs text-neutral-text">
        <span
          className={cn(
            "block h-2 w-2 rounded-full ring-2",
            product.availabilityStatus === "In Stock"
              ? "bg-success ring-green-500/30"
              : product.availabilityStatus === "Low Stock"
                ? "bg-warning ring-yellow-500/30"
                : "",
          )}
        />
        <p>{product.availabilityStatus}</p>
      </div>
    </TableCell>
  )

  const renderMoreActions = (
    <TableCell className="sticky right-0 top-0 w-14 bg-surface/10 px-2 py-1 text-xs backdrop-blur md:px-4 md:py-3 md:text-sm">
      <DropdownMenu>
        <DropdownMenuTrigger className="border-none bg-transparent hover:bg-transparent">
          <LuMoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          side="left"
          sideOffset={10}
          className="w-32"
        >
          <DropdownMenuItem>
            <FaEye /> View
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FaEdit />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <AlertDialogTrigger
              unstyled
              onClick={(e) => {
                e.stopPropagation()
              }}
              disabled={selectedProductsId.length === 0}
              className="flex h-auto w-full items-center justify-start gap-2 border-none py-2 text-xs text-neutral-text md:text-sm"
            >
              <FaTrash /> Delete
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  )

  return (
    <MijnUITableRow
      onClick={() => handleCheck(product.id)}
      className={cn(
        "relative border-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-main-border",
      )}
    >
      {renderCheckbox}
      {renderProduct}
      {renderCategory}
      {renderSellingPrice}
      {renderStock}
      {renderBrand}
      {renderSKU}
      {renderAvailabilityStatus}
      {renderDateAdded}
      {renderDateUpdated}
      {renderMoreActions}
    </MijnUITableRow>
  )
}

export default TableRow

/* -------------------------------------------------------------------------- */
