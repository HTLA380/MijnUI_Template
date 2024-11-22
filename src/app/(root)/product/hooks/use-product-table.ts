import { useEffect, useState } from "react"
import { useDeleteProduct, useFetchProducts } from "./use-products"
import useDebounce from "@/hooks/use-debounce"
import { toast } from "sonner"

const ItemsPerPageArray = [10, 20, 30]

/* -------------------------------------------------------------------------- */

export const useProductTable = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(ItemsPerPageArray[0])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sorting, setSorting] = useState({ column: "title", order: "asc" })
  const [searchInput, setSearchInput] = useState<string>("")
  const [selectedProductsId, setSelectedProductsId] = useState<number[]>([])
  const [isAllProductSelected, setIsAllProductSelected] =
    useState<boolean>(false)

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)

  const debouncedSearchInput = useDebounce(searchInput, 300)

  const {
    data: products,
    isLoading,
    isError,
  } = useFetchProducts(itemsPerPage, currentPage, sorting, debouncedSearchInput)

  const {
    mutate: handleDelete,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    isPending: isDeleteLoading,
  } = useDeleteProduct({
    onSuccess: () => {
      setIsDeleteDialogOpen(false)
      resetSelectedProducts()
      toast.success("Products deleted successfully...", {
        action: {
          label: "Got it",
          onClick: () => {},
        },
      })
    },
    onError: () => {
      setIsDeleteDialogOpen(false)
      resetSelectedProducts()
      toast.error("Failed to delete products...", {
        action: {
          label: "Got it",
          onClick: () => {},
        },
      })
    },
  })

  const resetSelectedProducts = () => {
    setSelectedProductsId([])
    setIsAllProductSelected(false)
  }

  useEffect(() => {
    if (isAllProductSelected) {
      setSelectedProductsId(
        products?.products.map((product) => product.id) || [],
      )
    } else {
      setSelectedProductsId([])
    }
  }, [isAllProductSelected, products])

  const handleCheck = (id: number) => {
    setSelectedProductsId((prev) =>
      prev.includes(id)
        ? prev.filter((productId) => productId !== id)
        : [...prev, id],
    )
  }

  const handleSelectAll = () => {
    setIsAllProductSelected(!isAllProductSelected)
  }

  const handleSort = () => {
    setSorting((prev) => ({
      column: prev.column,
      order: prev.order === "asc" ? "desc" : "asc",
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  return {
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    sorting,
    setSorting,
    searchInput,
    setSearchInput,
    selectedProductsId,
    setSelectedProductsId,
    isAllProductSelected,
    setIsAllProductSelected,
    debouncedSearchInput,
    products,
    isLoading,
    isError,
    handleCheck,
    handleSelectAll,
    handleSort,
    handleInputChange,
    resetSelectedProducts,

    handleDelete,
    isDeleteError,
    isDeleteSuccess,
    isDeleteLoading,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
  }
}
