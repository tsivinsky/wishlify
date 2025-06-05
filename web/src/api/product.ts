import { $axios } from "@/lib/axios";
import { Product } from "@/types/wishlist";
import { useMutation } from "@tanstack/react-query";

export type CreateProductData = Pick<
  Product,
  "name" | "price" | "currency" | "imageId"
> & {
  wishlistId: number;
};

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: async ({ wishlistId, ...data }: CreateProductData) => {
      const resp = await $axios.post<Product>(
        `/wishlists/${wishlistId}/products`,
        data,
      );
      return resp.data;
    },
  });
};

export const useDeleteProductMutation = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const resp = await $axios.delete<Product>(`/products/${id}`);
      return resp.data;
    },
  });
};
