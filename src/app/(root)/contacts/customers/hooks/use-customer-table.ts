import { useEffect, useState } from "react"
import { useDeleteUsers, useFetchUsers } from "./use-customers"
import useDebounce from "@/hooks/use-debounce"
import { toast } from "sonner"

const ItemsPerPageArray = [10, 20, 30]

/* -------------------------------------------------------------------------- */

export const useCustomerTable = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(ItemsPerPageArray[0])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sorting, setSorting] = useState({ column: "firstName", order: "asc" })
  const [searchInput, setSearchInput] = useState<string>("")
  const [selectedUsersId, setSelectedUsersId] = useState<number[]>([])
  const [isAllUserSelected, setIsAllUserSelected] = useState<boolean>(false)

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)

  const debouncedSearchInput = useDebounce(searchInput, 300)

  const {
    data: users,
    isLoading,
    isError,
  } = useFetchUsers(itemsPerPage, currentPage, sorting, debouncedSearchInput)

  const {
    mutate: handleDelete,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    isPending: isDeleteLoading,
  } = useDeleteUsers({
    onSuccess: () => {
      setIsDeleteDialogOpen(false)
      resetSelectedUsers()
      toast.success("Users deleted successfully...", {
        action: {
          label: "Got it",
          onClick: () => {},
        },
      })
    },
    onError: () => {
      setIsDeleteDialogOpen(false)
      resetSelectedUsers()
      toast.error("Failed to delete users...", {
        action: {
          label: "Got it",
          onClick: () => {},
        },
      })
    },
  })

  const resetSelectedUsers = () => {
    setSelectedUsersId([])
    setIsAllUserSelected(false)
  }

  useEffect(() => {
    if (isAllUserSelected) {
      setSelectedUsersId(users?.users.map((user) => user.id) || [])
    } else {
      setSelectedUsersId([])
    }
  }, [isAllUserSelected, users])

  const handleCheck = (id: number) => {
    setSelectedUsersId((prev) =>
      prev.includes(id)
        ? prev.filter((userId) => userId !== id)
        : [...prev, id],
    )
  }

  const handleSelectAll = () => {
    setIsAllUserSelected(!isAllUserSelected)
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
    selectedUsersId,
    setSelectedUsersId,
    isAllUserSelected,
    setIsAllUserSelected,
    debouncedSearchInput,
    users,
    isLoading,
    isError,
    handleCheck,
    handleSelectAll,
    handleSort,
    handleInputChange,
    resetSelectedUsers,

    handleDelete,
    isDeleteError,
    isDeleteSuccess,
    isDeleteLoading,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
  }
}
