import React from "react"
import { TableBody as MijnUITableBody } from "@mijn-ui/components/table"
import { cn } from "@mijn-ui/utils"
import { Product } from "../types"
import TableRow from "./table-row"
import TableRowSkeleton from "./table-row-skeleton"

/* -------------------------------------------------------------------------- */

type CustomerTableBodyProps = {
  products: Product[] | undefined
  handleCheck: (id: number) => void
  selectedProductsId: number[]
  isLoading: boolean
}

const TableBody = ({
  products,
  handleCheck,
  selectedProductsId,
  isLoading,
}: CustomerTableBodyProps) => {
  const renderLoadingSkeleton = Array.from(Array(10).keys()).map((_, index) => (
    <TableRowSkeleton key={index} />
  ))

  const renderCustomerRows = products?.map((product) => (
    <TableRow
      product={product}
      key={`product-${product.id}`}
      handleCheck={handleCheck}
      selectedProductsId={selectedProductsId}
    />
  ))
  return (
    <MijnUITableBody
      className={cn({ "pointer-events-none opacity-60": isLoading })}
    >
      {isLoading ? renderLoadingSkeleton : renderCustomerRows}
    </MijnUITableBody>
  )
}

export default TableBody