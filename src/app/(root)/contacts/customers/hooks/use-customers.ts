import axios from "axios";

import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { APIType } from "../types";

const BASE_URL = "https://dummyjson.com/users";

/* -------------------------------------------------------------------------- */

export const useFetchUsers = (
  itemsPerPage: number,
  currentPage: number,
  sorting: { column: string; order: string },
  searchInput: string,
) => {
  const itemsToSkip = itemsPerPage * (currentPage - 1);

  return useQuery({
    queryKey: ["users", { itemsPerPage, currentPage, sorting, searchInput }],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}/search?q=${searchInput}`, {
        params: {
          limit: itemsPerPage,
          skip: itemsToSkip,
          sortBy: sorting.column,
          order: sorting.order,
        },
      });

      return data as APIType;
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};

export const useDeleteUsers = ({
  onSuccess,
  onError,
  id = 1,
}: {
  onSuccess: () => void;
  onError: () => void;
  id?: number;
}) => {
  return useMutation({
    mutationKey: ["delete-users"],
    mutationFn: async () => {
      await axios.delete(`${BASE_URL}/${id}`);
    },
    onSuccess,
    onError,
  });
};

export const useCreateCustomer = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
  id?: number;
}) => {
  return useMutation({
    mutationKey: ["create-customers"],
    mutationFn: async () => {
      await axios.post(`${BASE_URL}/add`);
    },
    onSuccess,
    onError,
  });
};
