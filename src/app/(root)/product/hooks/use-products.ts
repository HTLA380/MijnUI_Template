import { APITypeProduct } from "@/app/(root)/product/types"
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"

const BASE_URL = "https://dummyjson.com/products"

/* -------------------------------------------------------------------------- */

export const useFetchProducts = (
  itemsPerPage: number,
  currentPage: number,
  sorting: { column: string; order: string },
  searchInput: string,
) => {
  const itemsToSkip = itemsPerPage * (currentPage - 1)

  return useQuery({
    queryKey: ["products", { itemsPerPage, currentPage, sorting, searchInput }],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}/search?q=${searchInput}`, {
        params: {
          limit: itemsPerPage,
          skip: itemsToSkip,
          sortBy: sorting.column,
          order: sorting.order,
        },
      })

      return data as APITypeProduct
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })
}

export const useDeleteProduct = ({
  onSuccess,
  onError,
  id = 1,
}: {
  onSuccess: () => void
  onError: () => void
  id?: number
}) => {
  return useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async () => {
      await axios.delete(`${BASE_URL}/${id}`)
    },
    onSuccess,
    onError,
  })
}

export const useCreateProduct = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void
  onError: () => void
  id?: number
}) => {
  return useMutation({
    mutationKey: ["create-product"],
    mutationFn: async () => {
      await axios.post(`${BASE_URL}/add`)
    },
    onSuccess,
    onError,
  })
}
