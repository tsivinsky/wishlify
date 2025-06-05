import { $axios } from "@/lib/axios";
import { Wishlist } from "@/types/wishlist";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";

export const wishlistsQuery = () =>
  queryOptions({
    queryKey: ["wishlists"],
    queryFn: async () => {
      const resp = await $axios.get<Wishlist[]>("/wishlists");
      return resp.data;
    },
  });

export const useWishlistsQuery = () => {
  return useQuery(wishlistsQuery());
};

export type CreateWishlistData = {
  name: string;
  description: string;
};

export const useCreateWishlistMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateWishlistData) => {
      const resp = await $axios.post<Wishlist>("/wishlists", data);
      return resp.data;
    },
  });
};

export const wishlistQuery = (uuid: string) =>
  queryOptions({
    queryKey: ["wishlists", { uuid }],
    queryFn: async () => {
      const resp = await $axios.get<Wishlist>(`/wishlists/${uuid}`);
      return resp.data;
    },
  });

export const useWishlistQuery = (uuid: string) => {
  return useQuery(wishlistQuery(uuid));
};

export const useDeleteWishlistMutation = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const resp = await $axios.delete(`/wishlists/${id}`);
      return resp.data;
    },
  });
};
