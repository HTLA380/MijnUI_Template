"use client"

import * as React from "react"
import { AlertDialog } from "@mijn-ui/components/alert-dialog"
import { Table } from "@mijn-ui/components/table"
import SelectionMenu from "@/components/menu/selection-menu"
import TablePaginator from "@/components/table/table-paginator"
import { useProductTable } from "../hooks/use-product-table"
import DeleteModalContent from "./delete-modal-content"
import TableActions from "./table-actions"
import TableBody from "./table-body"
import TableErrorMessage from "./table-error-message"
import TableHeader from "./table-header"

/* -------------------------------------------------------------------------- */

const ItemsPerPageArray = ["10", "20", "30"]

const ProductTable: React.FC = () => {
  const {
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    searchInput,
    selectedProductsId,
    isAllProductSelected,
    products,
    isLoading,
    isError,
    handleCheck,
    handleSelectAll,
    handleSort,
    handleInputChange,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDelete,
    isDeleteLoading,
  } = useProductTable()

  return (
    <>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <TableActions
          searchInput={searchInput}
          handleInputChange={handleInputChange}
          totalSelectedUsers={selectedProductsId.length}
        />

        <div className="relative w-full h-full max-h-max overflow-auto bg-surface">
          <TableErrorMessage isError={isError} />

          <Table className="w-full border-none">
            <TableHeader
              handleSelectAll={handleSelectAll}
              handleSort={handleSort}
              isAllUserSelected={isAllProductSelected}
            />

            <TableBody
              products={products?.products}
              isLoading={isLoading}
              handleCheck={handleCheck}
              selectedProductsId={selectedProductsId}
            />

            <DeleteModalContent
              isLoading={isDeleteLoading}
              onDelete={handleDelete}
            />
          </Table>
        </div>
      </AlertDialog>

      <div className="flex w-full flex-wrap items-center justify-between gap-2 bg-surface p-5 md:flex-nowrap md:rounded-b-2xl">
        <div className="flex w-full items-center gap-4">
          <div className="flex w-full items-center justify-between gap-4 md:justify-normal">
            <div className="w-20">
              <SelectionMenu
                defaultValue={itemsPerPage}
                selectionItems={ItemsPerPageArray}
                onValueChange={(value) => setItemsPerPage(Number(value))}
                classNames={{
                  selectContent: "min-w-20",
                }}
              />
            </div>

            {/* Selected products */}
            <p className="text-xs text-neutral-text md:text-sm">
              products {selectedProductsId.length} selected out of{" "}
              {products?.total}
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-center md:justify-end">
          <TablePaginator
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onChangePage={setCurrentPage}
            total={products?.total}
          />
        </div>
      </div>
    </>
  )
}

export default ProductTable

/* -------------------------------------------------------------------------- */
